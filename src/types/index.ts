export type TaskTag = {
  id: string;
  name: string;
  color: string;
};

export interface Task {
  id: string;
  content: string;
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: TaskTag[];
}

export interface Quadrant {
  id: string;
  title: string;
  tasks: Task[];
} 