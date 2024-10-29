'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TaskTag } from '../types';

interface TagFilterProps {
  allTags: TaskTag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ allTags, selectedTags, onTagSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (allTags.length === 0) return null;

  const selectedTagsData = allTags.filter(tag => selectedTags.includes(tag.id));

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1.5 text-sm text-white/70 hover:text-white
            border border-white/[0.1] rounded-md
            hover:border-white/[0.2] transition-colors
            bg-white/[0.02] hover:bg-white/[0.05]
            flex items-center gap-2"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          Filter Tags
          {selectedTags.length > 0 && (
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-white/[0.1]">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Selected tags preview */}
        {selectedTagsData.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-[50vw] pb-2">
            {selectedTagsData.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagSelect(tag.id)}
                className="px-2 py-1 rounded-full text-xs transition-all
                  ring-1 ring-offset-1 ring-offset-black
                  whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  border: `1px solid ${tag.color}40`,
                  boxShadow: `0 0 10px ${tag.color}20`
                }}
              >
                {tag.name}
                <span className="ml-1 opacity-60">×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tags dropdown */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 p-3
          border border-white/[0.1] rounded-lg bg-black
          shadow-xl min-w-[300px] max-w-[90vw] z-10"
        >
          <div className="text-xs text-white/50 mb-2">
            {allTags.length} available tags
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {allTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagSelect(tag.id)}
                className={`
                  flex items-center gap-2 p-2 rounded-lg text-left
                  border border-white/[0.1] hover:border-white/[0.2]
                  transition-all duration-200 group
                  ${selectedTags.includes(tag.id) ? 'bg-white/[0.05]' : ''}
                  min-w-0
                `}
                style={{
                  backgroundColor: selectedTags.includes(tag.id) ? `${tag.color}10` : undefined
                }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <span className={`text-sm truncate ${
                  selectedTags.includes(tag.id) 
                    ? 'text-white/90' 
                    : 'text-white/70 group-hover:text-white/90'
                }`}>
                  {tag.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;