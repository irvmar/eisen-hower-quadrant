'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from '@hello-pangea/dnd';
import { Task as TaskType, Quadrant, TaskTag } from '../types';
import TaskInput from './TaskInput';
import Task from './Task';
import Modal from './Modal';
import { loadMatrix, saveMatrix, syncWithFirestore } from '../services/firestore';
import TodayProgress from './TodayProgress';
import TagManagementModal from './TagManagementModal';
import TagFilter from './TagFilter';

const initialQuadrants: Quadrant[] = [
  {
    id: 'urgent-important',
    title: 'Urgent & Important',
    tasks: []
  },
  {
    id: 'not-urgent-important',
    title: 'Not Urgent & Important',
    tasks: []
  },
  {
    id: 'urgent-not-important',
    title: 'Urgent & Not Important',
    tasks: []
  },
  {
    id: 'not-urgent-not-important',
    title: 'Not Urgent & Not Important',
    tasks: []
  }
];

const EisenhowerMatrix: React.FC = () => {
  const [quadrants, setQuadrants] = useState<Quadrant[]>(initialQuadrants);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggingOver, setDraggingOver] = useState<string | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadMatrix();
        setQuadrants(data);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        saveMatrix(quadrants).catch(error => {
          console.error('Error saving matrix:', error);
        });
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [quadrants, isLoading]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Sync with Firestore when coming back online
      syncWithFirestore(quadrants).catch(console.error);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [quadrants]);

  useEffect(() => {
    if (!isLoading) {
      const totalTasks = quadrants.reduce((sum, quadrant) => sum + quadrant.tasks.length, 0);
      if (totalTasks === 0) {
        setIsModalOpen(true);
      }
    }
  }, [isLoading, quadrants]);

  const handleTasksAnalyzed = (analyzedTasks: Array<{ content: string, quadrant: string }>) => {
    const newQuadrants = [...quadrants];
    
    analyzedTasks.forEach(analyzedTask => {
      const quadrant = newQuadrants.find(q => q.id === analyzedTask.quadrant);
      if (quadrant) {
        quadrant.tasks.push({
          id: `task-${Date.now()}-${Math.random()}`,
          content: analyzedTask.content,
          quadrant: analyzedTask.quadrant as TaskType['quadrant'],
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: []
        });
      }
    });

    setQuadrants(newQuadrants);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Drop outside the list
    if (!destination) return;

    // Drop in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Find source and destination quadrants
    const sourceQuadrant = quadrants.find(q => q.id === source.droppableId);
    const destQuadrant = quadrants.find(q => q.id === destination.droppableId);

    if (!sourceQuadrant || !destQuadrant) return;

    // Create new quadrants array
    const newQuadrants = [...quadrants];

    // Find and remove task from source
    const [movedTask] = sourceQuadrant.tasks.splice(source.index, 1);

    // Update task's quadrant if moving to a different quadrant
    if (source.droppableId !== destination.droppableId) {
      movedTask.quadrant = destination.droppableId as TaskType['quadrant'];
      movedTask.updatedAt = new Date();
    }

    // Insert task at new position
    destQuadrant.tasks.splice(destination.index, 0, movedTask);

    setQuadrants(newQuadrants);
  };

  const handleToggleComplete = (taskId: string) => {
    const newQuadrants = quadrants.map(quadrant => ({
      ...quadrant,
      tasks: quadrant.tasks.map(task => 
        task.id === taskId
          ? { ...task, isDone: !task.isDone, updatedAt: new Date() }
          : task
      )
    }));

    setQuadrants(newQuadrants);
  };

  const handleDeleteTask = (taskId: string) => {
    const newQuadrants = quadrants.map(quadrant => ({
      ...quadrant,
      tasks: quadrant.tasks.filter(task => task.id !== taskId)
    }));

    setQuadrants(newQuadrants);
  };

  const allTasks = quadrants.flatMap(q => q.tasks);

  const handleAddTag = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsTagModalOpen(true);
  };

  const handleTagCreated = (newTag: Omit<TaskTag, 'id'>) => {
    if (!selectedTaskId) return;

    // Check if a tag with this name already exists
    const existingTag = getAllTags().find(
      tag => tag.name.toLowerCase() === newTag.name.toLowerCase()
    );

    const tagToAdd = existingTag || {
      ...newTag,
      id: `tag-${Date.now()}-${Math.random()}`
    };

    const newQuadrants = quadrants.map(quadrant => ({
      ...quadrant,
      tasks: quadrant.tasks.map(task => {
        if (task.id === selectedTaskId) {
          return {
            ...task,
            tags: [...(task?.tags  || []), tagToAdd],
            updatedAt: new Date()
          };
        }
        return task;
      })
    }));

    setQuadrants(newQuadrants);
  };

  const handleRemoveTag = (taskId: string, tagId: string) => {
    const newQuadrants = quadrants.map(quadrant => ({
      ...quadrant,
      tasks: quadrant.tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            tags: task.tags?.filter(tag => tag.id !== tagId)
          };
        }
        return task;
      })
    }));

    setQuadrants(newQuadrants);
  };

  const getAllTags = () => {
    const tagsMap = new Map<string, TaskTag>();
    
    quadrants.forEach(quadrant => {
      quadrant?.tasks.forEach(task => {
        task?.tags?.forEach(tag => {
          const key = tag.name.toLowerCase();
          if (!tagsMap.has(key)) {
            tagsMap.set(key, tag);
          }
        });
      });
    });

    return Array.from(tagsMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  };

  const filterTasksByTags = (tasks: TaskType[]) => {
    if (selectedTags.length === 0) return tasks;

    return tasks.filter(task => {
      console.log(task.tags);
      // Show task if it has ANY of the selected tags
      return selectedTags.some(selectedTagId => {
        // Make sure task.tags exists and is an array
        return task.tags?.some(taskTag => taskTag.id === selectedTagId);
      });
    });
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="h-12 w-12 rounded-full border-2 border-gray-800 border-t-gray-400 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-black min-h-screen">
      {!isOnline && (
        <div className="w-full border-b border-white/[0.1] bg-black p-2 text-center">
          <span className="text-sm text-yellow-500/70">
            You&apos;re currently offline. Changes will be saved locally and synced when you&apos;re back online.
          </span>
        </div>
      )}
      
      <div className="w-full max-w-7xl px-4 py-6">
        <TodayProgress allTasks={allTasks} />
        
        <div className="flex justify-between items-center mb-8">
          <TagFilter
            allTags={getAllTags()}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm text-white/70 hover:text-white
              border border-white/[0.1] rounded-md
              hover:border-white/[0.2] transition-colors
              bg-white/[0.02] hover:bg-white/[0.05]"
          >
            + New Tasks
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[80vh]">
            {quadrants.map((quadrant) => (
              <Droppable key={quadrant.id} droppableId={quadrant.id}>
                {(provided: DroppableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      relative border border-white/[0.1] rounded-xl p-4 flex flex-col bg-black
                      ${quadrant.id === 'urgent-important' ? 'bg-gradient-to-b from-red-950/20 to-transparent' : ''}
                      ${quadrant.id === 'not-urgent-important' ? 'bg-gradient-to-b from-blue-950/20 to-transparent' : ''}
                      ${quadrant.id === 'urgent-not-important' ? 'bg-gradient-to-b from-yellow-950/20 to-transparent' : ''}
                      ${quadrant.id === 'not-urgent-not-important' ? 'bg-gradient-to-b from-purple-950/20 to-transparent' : ''}
                      overflow-hidden
                    `}
                    onDragEnter={() => setDraggingOver(quadrant.id)}
                    onDragLeave={() => setDraggingOver(null)}
                  >
                    {draggingOver === quadrant.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 border border-white/[0.2] rounded-xl">
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-border-top" />
                            <div className="absolute top-0 right-0 w-[2px] h-full bg-white/20 animate-border-right" />
                            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-white/20 animate-border-bottom" />
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-white/20 animate-border-left" />
                          </div>
                        </div>
                      </div>
                    )}
                    <h2 className={`
                      text-xs font-medium tracking-wider mb-4 uppercase text-white/80
                    `}>
                      {quadrant.title}
                      {selectedTags.length > 0 && (
                        <span className="ml-2 text-white/40">
                          ({filterTasksByTags(quadrant.tasks).length})
                        </span>
                      )}
                    </h2>
                    <div className="flex-1 min-h-[100px] rounded-lg p-3 
                      border border-white/[0.1] bg-black/50 
                      overflow-y-auto">
                      {filterTasksByTags(quadrant.tasks).map((task, index) => (
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          onToggleComplete={handleToggleComplete}
                          onDelete={handleDeleteTask}
                          onAddTag={handleAddTag}
                          onRemoveTag={handleRemoveTag}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="pr-8">
          <h2 className="text-lg font-medium text-white/90">
            Add Tasks to Your Matrix
          </h2>
          <p className="text-sm text-white/50 mt-1">
            Enter your tasks below and we&apos;ll help you organize them using the Eisenhower Matrix method.
          </p>
          <TaskInput
            onTasksAnalyzed={(tasks) => {
              handleTasksAnalyzed(tasks);
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>

      <TagManagementModal
        isOpen={isTagModalOpen}
        onClose={() => {
          setIsTagModalOpen(false);
          setSelectedTaskId(null);
        }}
        onAddTag={handleTagCreated}
        taskId={selectedTaskId || ''}
        existingTags={
          selectedTaskId 
            ? quadrants
                .flatMap(q => q.tasks)
                .find(t => t.id === selectedTaskId)?.tags || []
            : []
        }
        allAvailableTags={getAllTags()}
      />
    </div>
  );
};

export default EisenhowerMatrix; 