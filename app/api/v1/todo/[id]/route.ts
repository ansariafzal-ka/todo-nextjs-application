import { connectDb } from "@/utils/database";
import { Todo } from "@/models/todo";

interface Props {
  id: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: Props }
) => {
  try {
    await connectDb();
    const task = await Todo.findById(params.id);
    if (!task)
      return new Response("No task found with this id", { status: 400 });
    const deletedTask = await Todo.findByIdAndDelete(params.id);
    return new Response(
      JSON.stringify({
        message: "Task Deleted successfully",
        deletedTask: deletedTask,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting task : ", error);
    return new Response("Error deleting task", { status: 500 });
  }
};

export const PUT = async (request: Request, { params }: { params: Props }) => {
  try {
    const { task } = await request.json();
    if (!task) return new Response("Task is missing!", { status: 400 });
    const updatedTask = await Todo.findByIdAndUpdate(
      params.id,
      {
        task: task,
      },
      { new: true }
    );
    return new Response(
      JSON.stringify({
        message: "Task updated successfully",
        updatedTask: updatedTask,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating task : ", error);
    return new Response("Error updating task", { status: 500 });
  }
};
