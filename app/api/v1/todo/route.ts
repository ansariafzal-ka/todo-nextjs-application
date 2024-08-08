import { connectDb } from "@/utils/database";
import { Todo } from "@/models/todo";

export const GET = async (request: Request) => {
  try {
    await connectDb();
    const todos = await Todo.find();
    return new Response(JSON.stringify({ todos: todos }));
  } catch (error) {
    return new Response("Error creating new todo", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDb();
    const { task } = await request.json();

    if (!task) return new Response("Task is missing!", { status: 400 });

    const newTask = await Todo.create({
      task: task,
    });
    return new Response(
      JSON.stringify({ message: "Task created successfully", newTask: newTask })
    );
  } catch (error) {
    return new Response("Error creating new todo", { status: 500 });
  }
};
