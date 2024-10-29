'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { TaskTag } from '../types';
import { getUniqueTags, getSuggestedTags } from '../utils/tagUtils';

interface TagManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTag: (tag: Omit<TaskTag, 'id'>) => void;
  taskId: string;
  existingTags: TaskTag[];
  allAvailableTags: TaskTag[];
}

const PRESET_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#10B981', // emerald
  '#06B6D4', // cyan
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#EC4899', // pink
];

const TagManagementModal: React.FC<TagManagementModalProps> = ({
  isOpen,
  onClose,
  onAddTag,
  taskId,
  existingTags,
  allAvailableTags
}) => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('existing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim()) {
      onAddTag({
        name: tagName.trim(),
        color: selectedColor
      });
      setTagName('');
      setSelectedColor(PRESET_COLORS[0]);
      onClose();
    }
  };

  const handleExistingTagClick = (tag: TaskTag) => {
    if (!existingTags.some(t => t.id === tag.id)) {
      onAddTag({
        name: tag.name,
        color: tag.color
      });
    }
  };

  // Filter out tags that are already added to this task
  const availableTags = allAvailableTags.filter(
    tag => !existingTags.some(t => t.name === tag.name)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white/90">
          Add Tag
        </h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.1]">
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-4 py-2 text-sm transition-colors relative
              ${activeTab === 'existing' 
                ? 'text-white' 
                : 'text-white/50 hover:text-white/70'}`}
          >
            Existing Tags
            {activeTab === 'existing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/70" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 text-sm transition-colors relative
              ${activeTab === 'new' 
                ? 'text-white' 
                : 'text-white/50 hover:text-white/70'}`}
          >
            Create New
            {activeTab === 'new' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/70" />
            )}
          </button>
        </div>

        {activeTab === 'existing' ? (
          <div className="space-y-4">
            {availableTags.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleExistingTagClick(tag)}
                    className="flex items-center gap-2 p-2 rounded-lg
                      border border-white/[0.1] hover:border-white/[0.2]
                      transition-all duration-200 group text-left"
                    style={{
                      backgroundColor: `${tag.color}10`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90">
                      {tag.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/50 text-center py-4">
                No available tags to add
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Tag Name
              </label>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="w-full p-2 text-sm text-white/70 bg-black
                  border border-white/[0.1] rounded-lg
                  placeholder-white/30
                  focus:border-white/[0.2] focus:ring-0
                  transition-colors"
                placeholder="Enter tag name"
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/70 mb-2">
                Color
              </label>
              <div className="grid grid-cols-9 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-6 h-6 rounded-full
                      ${selectedColor === color ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-black' : ''}
                      transition-all duration-200
                    `}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={!tagName.trim()}
                className="px-4 py-2 text-sm text-white/70 hover:text-white
              border border-white/[0.1] rounded-md
              hover:border-white/[0.2] transition-colors
              bg-white/[0.02] hover:bg-white/[0.05]
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:bg-white/[0.02] disabled:hover:text-white/70"
              >
                Create Tag
              </button>
            </div>
          </form>
        )}

        {existingTags.length > 0 && (
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Current Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {existingTags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-2 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                    border: `1px solid ${tag.color}40`
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TagManagementModal;