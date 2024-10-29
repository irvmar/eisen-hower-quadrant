import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const audioBlob = formData.get('audio') as Blob;

        if (!audioBlob) {
            return NextResponse.json(
                { error: 'No audio file provided' },
                { status: 400 }
            );
        }

        // Convert Blob to File with required properties
        const audioFile = new File([audioBlob], 'audio.webm', {
            type: audioBlob.type,
            lastModified: Date.now(),
        });

        const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: "whisper-1",
            // Remove language parameter to enable auto-detection
            response_format: "text"
        });

        return NextResponse.json({ text: transcription });
    } catch (error) {
        console.error('Error transcribing audio:', error);
        return NextResponse.json(
            { error: 'Failed to transcribe audio' },
            { status: 500 }
        );
    }
} 