import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define the schema for task analysis
const taskSchema = {
  type: "object",
  properties: {
    tasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "The content of the task"
          },
          quadrant: {
            type: "string",
            enum: [
              "urgent-important",
              "not-urgent-important",
              "urgent-not-important",
              "not-urgent-not-important"
            ],
            description: "The quadrant where the task belongs"
          }
        },
        required: ["content", "quadrant"]
      }
    }
  },
  required: ["tasks"]
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { tasks } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a task analyzer that helps categorize tasks into the Eisenhower Matrix. Analyze each task and categorize it based on its urgency and importance."
        },
        {
          role: "user",
          content: tasks
        }
      ],
      tools: [{
        type: "function",
        function: {
          name: "analyze_tasks",
          description: "Analyze and categorize tasks into the Eisenhower Matrix",
          parameters: taskSchema
        }
      }],
      tool_choice: { type: "function", function: { name: "analyze_tasks" } }
    });

    const toolCall = response.choices[0].message.tool_calls?.[0];
    
    if (!toolCall || toolCall.type !== 'function') {
      throw new Error('No valid tool call in response');
    }

    const result = JSON.parse(toolCall.function.arguments);
    return NextResponse.json({ tasks: result.tasks });
  } catch (error) {
    console.error('Error analyzing tasks:', error);
    return NextResponse.json(
      { error: 'Failed to analyze tasks' },
      { status: 500 }
    );
  }
} 