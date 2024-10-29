import { TaskTag } from '../types';

// Get all unique tags across all tasks
export const getUniqueTags = (tags: TaskTag[]): TaskTag[] => {
  const uniqueTags = new Map<string, TaskTag>();
  
  tags.forEach(tag => {
    if (!uniqueTags.has(tag.name)) {
      uniqueTags.set(tag.name, tag);
    }
  });

  return Array.from(uniqueTags.values());
};

// Get suggested tags based on task content
export const getSuggestedTags = (content: string, existingTags: TaskTag[]): TaskTag[] => {
  const lowercaseContent = content.toLowerCase();
  
  return existingTags.filter(tag => 
    lowercaseContent.includes(tag.name.toLowerCase())
  );
}; 