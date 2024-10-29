'use client';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task as TaskType } from '../types';
import TaskTag from './TaskTag';

interface TaskProps {
  task: TaskType;
  index: number;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onAddTag?: (taskId: string) => void;
  onRemoveTag?: (taskId: string, tagId: string) => void;
}

const Task: React.FC<TaskProps> = ({ 
  task, 
  index, 
  onToggleComplete, 
  onDelete,
  onAddTag,
  onRemoveTag
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            flex flex-col gap-2 p-3 mb-2
            border border-white/[0.1] rounded-lg
            bg-black
            transition-all duration-200
            hover:border-white/[0.2]
            group
            ${snapshot.isDragging ? 'shadow-2xl shadow-black/50 border-white/[0.2] bg-white/[0.02]' : ''}
            ${task.isDone ? 'bg-white/[0.02]' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-4 h-4">
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => onToggleComplete(task.id)}
                className={`
                  appearance-none w-4 h-4
                  border border-white/[0.1] rounded-md
                  bg-black
                  transition-all duration-200
                  hover:border-white/[0.2]
                  focus:ring-1 focus:ring-white/[0.1] focus:ring-offset-0 focus:ring-offset-black
                  cursor-pointer
                  ${task.isDone ? 'bg-emerald-500/10 border-emerald-500/20' : ''}
                `}
              />
              {task.isDone && (
                <svg
                  className="absolute inset-0 w-4 h-4 text-emerald-500/80 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className={`flex-1 text-sm text-white/70 font-light ${task.isDone ? 'line-through text-white/40' : ''}`}>
              {task.content}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                p-1 hover:bg-white/[0.05] rounded-md"
            >
              <svg
                className="w-4 h-4 text-white/40 hover:text-white/70 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Tags Section */}
          <div className="flex flex-wrap gap-1 mt-1">
            {task.tags?.map(tag => (
              <TaskTag
                key={tag.id}
                tag={tag}
                onRemove={onRemoveTag ? () => onRemoveTag(task.id, tag.id) : undefined}
              />
            ))}
            {onAddTag && (
              <button
                onClick={() => onAddTag(task.id)}
                className="inline-flex items-center px-2 py-0.5 rounded-full
                  text-xs font-medium text-white/50
                  border border-white/[0.1] hover:border-white/[0.2]
                  transition-colors opacity-0 group-hover:opacity-100"
              >
                + Add Tag
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task; 