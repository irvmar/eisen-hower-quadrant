'use client';

import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

interface TaskInputProps {
    onTasksAnalyzed: (tasks: Array<{ content: string, quadrant: string }>) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onTasksAnalyzed }) => {
    const [taskText, setTaskText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyzeTasksWithAI = async (text: string) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/analyze-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks: text }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze tasks');
            }

            const data = await response.json();
            onTasksAnalyzed(data.tasks);
            setTaskText('');
            setError(null);
        } catch (error) {
            setError('Failed to analyze tasks');
            console.error('Error analyzing tasks:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskText.trim()) {
            analyzeTasksWithAI(taskText);
        }
    };

    const handleTranscriptionComplete = (text: string) => {
        setTaskText(text);
    };

    const handleRecordingStart = () => {
        setTaskText('');
        setError(null);
    };

    const handleRecordingError = (error: string) => {
        setError(error);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
                <AudioRecorder
                    onTranscriptionComplete={handleTranscriptionComplete}
                    onRecordingStart={handleRecordingStart}
                    onError={handleRecordingError}
                />
                {/* jump line */}

            </div>

            <div className="text-xs text-white/50 ">
                or type manually:
            </div>
            {error && (
                <div className="text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                    {error}
                </div>
            )}

            <textarea
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter your tasks (one per line)&#10;Example:&#10;Finish project report&#10;Call dentist&#10;Plan vacation&#10;Read new book"
                className="w-full p-4 text-sm text-white/70 bg-black
          border border-white/[0.1] rounded-lg
          placeholder-white/30
          focus:border-white/[0.2] focus:ring-0
          transition-colors resize-none h-48"
                disabled={isLoading}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading || !taskText.trim()}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white
            border border-white/[0.1] rounded-md
            hover:border-white/[0.2] transition-colors
            bg-white/[0.02] hover:bg-white/[0.05]
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-white/[0.02] disabled:hover:border-white/[0.1]"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Tasks'}
                </button>
            </div>
        </form>
    );
};

export default TaskInput; 