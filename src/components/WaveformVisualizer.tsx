'use client';

import React, { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
  isRecording: boolean;
  stream: MediaStream | null;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isRecording, stream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();
  const dataArrayRef = useRef<Uint8Array>();

  useEffect(() => {
    if (!stream || !isRecording || !canvasRef.current) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;
    
    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d')!;

    const draw = () => {
      if (!isRecording) return;

      animationFrameRef.current = requestAnimationFrame(draw);
      const width = canvas.width;
      const height = canvas.height;

      analyser.getByteFrequencyData(dataArrayRef.current!);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArrayRef.current![i] / 255) * height;

        const alpha = Math.min(0.3 + (barHeight / height) * 0.7, 1);
        canvasCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        
        canvasCtx.fillRect(
          x,
          height - barHeight,
          barWidth,
          barHeight
        );

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioContext.close();
    };
  }, [isRecording, stream]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={60}
      className="rounded-lg border border-white/[0.1] bg-black"
    />
  );
};

export default WaveformVisualizer; 