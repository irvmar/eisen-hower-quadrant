'use client';

import React from 'react';
import { TaskTag as TaskTagType } from '../types';

interface TaskTagProps {
  tag: TaskTagType;
  onRemove?: () => void;
  interactive?: boolean;
}

const TaskTag: React.FC<TaskTagProps> = ({ tag, onRemove, interactive = true }) => {
  return (
    <div 
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full
        text-xs font-medium
        border border-white/[0.1]
        ${interactive ? 'group hover:border-white/[0.2]' : ''}
        transition-colors
      `}
      style={{
        backgroundColor: `${tag.color}10`,
        color: `${tag.color}`,
      }}
    >
      {tag.name}
      {interactive && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="opacity-0 group-hover:opacity-100 hover:text-white/90 transition-opacity"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TaskTag; 