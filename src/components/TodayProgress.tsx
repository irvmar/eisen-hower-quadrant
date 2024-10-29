'use client';

import React from 'react';
import { Task } from '../types';

interface TodayProgressProps {
  allTasks: Task[];
}

const TodayProgress: React.FC<TodayProgressProps> = ({ allTasks }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysTasks = allTasks.filter(task => {
    const taskDate = task.updatedAt instanceof Date 
      ? task.updatedAt 
      : new Date(task.updatedAt);
    
    const taskDateOnly = new Date(taskDate);
    taskDateOnly.setHours(0, 0, 0, 0);

    return taskDateOnly.getTime() === today.getTime();
  });

  const totalTasks = allTasks.length;
  const totalCompletedTasks = allTasks.filter(task => task.isDone).length;

  const completionRate = totalTasks > 0 
    ? Math.round((totalCompletedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="border border-white/[0.1] rounded-lg p-4 mb-6 bg-black">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-white/70">Progress Overview</h2>
        <span className="text-xs text-white/50">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border border-white/[0.1] rounded-lg p-3 bg-white/[0.02]">
          <div className="text-2xl font-medium text-white/90 mb-1">
            {totalCompletedTasks}
          </div>
          <div className="text-xs text-white/50">
            Tasks Completed
          </div>
        </div>
        
        <div className="border border-white/[0.1] rounded-lg p-3 bg-white/[0.02]">
          <div className="text-2xl font-medium text-white/90 mb-1">
            {totalTasks}
          </div>
          <div className="text-xs text-white/50">
            Total Tasks
          </div>
        </div>
        
        <div className="border border-white/[0.1] rounded-lg p-3 bg-white/[0.02]">
          <div className="text-2xl font-medium text-white/90 mb-1">
            {completionRate}%
          </div>
          <div className="text-xs text-white/50">
            Completion Rate
          </div>
        </div>
      </div>

      {todaysTasks.length > 0 && (
        <div className="border border-white/[0.1] rounded-lg p-3 bg-white/[0.02]">
          <h3 className="text-xs font-medium text-white/70 mb-2">
            Today&apos;s Activity ({todaysTasks.filter(t => t.isDone).length} completed)
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {todaysTasks.map(task => (
              <div 
                key={task.id}
                className="flex items-center gap-2 text-sm text-white/50"
              >
                <svg 
                  className={`w-4 h-4 ${task.isDone ? 'text-emerald-500/80' : 'text-white/20'}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                <span className={task.isDone ? 'line-through' : ''}>
                  {task.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayProgress;