'use client';

import React, { useState, useRef } from 'react';
import WaveformVisualizer from './WaveformVisualizer';

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  onRecordingStart: () => void;
  onError: (error: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptionComplete,
  onRecordingStart,
  onError
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);
      mediaRecorder.current = new MediaRecorder(audioStream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await handleTranscription(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setIsPaused(false);
      onRecordingStart();
    } catch (err) {
      onError('Microphone access denied');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      setStream(null);
    }
  };

  const handleTranscription = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Transcription failed');

      const data = await response.json();
      onTranscriptionComplete(data.text);
    } catch (err) {
      onError('Failed to transcribe audio');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isProcessing}
            className="px-4 py-2 text-sm text-white/70 hover:text-white
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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            {isProcessing ? 'Processing...' : 'Record Tasks'}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {isPaused ? (
              <button
                onClick={resumeRecording}
                className="p-2 text-emerald-400 hover:text-emerald-300
                  border border-emerald-900/30 rounded-full
                  hover:border-emerald-900/50 transition-colors
                  bg-emerald-950/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={pauseRecording}
                className="p-2 text-yellow-400 hover:text-yellow-300
                  border border-yellow-900/30 rounded-full
                  hover:border-yellow-900/50 transition-colors
                  bg-yellow-950/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            )}
            <button
              onClick={stopRecording}
              className="p-2 text-red-400 hover:text-red-300
                border border-red-900/30 rounded-full
                hover:border-red-900/50 transition-colors
                bg-red-950/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {isRecording && (
        <WaveformVisualizer
          isRecording={isRecording && !isPaused}
          stream={stream}
        />
      )}
    </div>
  );
};

export default AudioRecorder;