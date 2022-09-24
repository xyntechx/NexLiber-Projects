import { useEffect, useState } from "preact/hooks";

export default function ProjectData({ title }: { title: string }) {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([""]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(`Fresh Project Manager: ${title}`)!,
    );
    setDescription(stored.description);
    setTasks(stored.tasks);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem(`Fresh Project Manager: ${title}`)!,
    );
    setTasks(stored.tasks);
  }, [isAddingTask]);

  const deleteProject = () => {
    localStorage.removeItem(`Fresh Project Manager: ${title}`);
    window.location.href = "/";
  };

  const deleteTask = (task: string) => {
    const tempTasks = tasks.filter((t) => t !== task);
    localStorage.setItem(
      "Fresh Project Manager: " + title,
      JSON.stringify({
        title: title,
        description: description,
        tasks: tempTasks,
      }),
    );
    location.reload();
  };

  return (
    <>
      <div class="w-full flex items-center justify-between flex-col md:flex-row">
        <div class="w-full md:w-4/5 flex items-center justify-start flex-col">
          <a
            href="/"
            class="text-gray-500 hover:text-blue-500 transition-colors w-full text-left mb-5"
          >
            ⬅️ Back
          </a>
          <h1 class="font-bold text-2xl text-left w-full">{title}</h1>
          <p class="text-left w-full">{description}</p>
        </div>
        <div class="w-full md:w-1/5 flex items-center justify-start md:justify-end">
          <button
            onClick={() => deleteProject()}
            class="bg-red-500 hover:bg-red-600 rounded-md py-1 px-10 text-gray-100 transition-colors focus:outline-none outline-none mt-5"
          >
            Delete
          </button>
        </div>
      </div>

      <div class="flex flex-col items-start justify-start w-full mt-5 gap-y-5">
        {tasks.map((task) => (
          <div class="border w-full p-5 rounded-md flex items-center justify-between flex-col md:flex-row">
            <p class="text-left w-full md:w-3/5">{task}</p>
            <div class="flex items-center justify-center md:justify-end w-full md:w-2/5 gap-x-2 md:gap-x-5 mt-2 md:mt-0">
              <button
                onClick={() => deleteTask(task)}
                class="border border-green-500 hover:bg-green-500 rounded-md py-1 px-5 text-green-500 hover:text-gray-100 transition-colors focus:outline-none outline-none"
              >
                Complete
              </button>
              <button
                onClick={() => deleteTask(task)}
                class="border border-red-500 hover:bg-red-500 rounded-md py-1 px-5 text-red-500 hover:text-gray-100 transition-colors focus:outline-none outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddTask
        projectTitle={title}
        description={description}
        tasks={tasks}
        isAddingTask={isAddingTask}
        setIsAddingTask={setIsAddingTask}
      />

      <button
        onClick={() => setIsAddingTask(true)}
        class="text-gray-500 border border-gray-500 hover:(text-blue-500 border-blue-500) rounded-md py-1 px-2 transition-colors flex items-center justify-center mt-5 focus:outline-none"
      >
        + Add Task
      </button>
    </>
  );
}

interface AddTaskProps {
  projectTitle: string;
  description: string;
  tasks: string[];
  isAddingTask: boolean;
  setIsAddingTask: (isAddingTask: boolean) => void;
}

function AddTask(
  { projectTitle, description, tasks, isAddingTask, setIsAddingTask }:
    AddTaskProps,
) {
  const [task, setTask] = useState("");

  const addTask = () => {
    let newTasks: string[] = [];

    if (task) {
      if (tasks[0] === "") newTasks = [task];
      else newTasks = [...tasks, task];

      localStorage.setItem(
        "Fresh Project Manager: " + projectTitle,
        JSON.stringify({
          title: projectTitle,
          description: description,
          tasks: newTasks,
        }),
      );
    }

    window.location.href = `/${projectTitle}`;

    setIsAddingTask(false);
  };

  return (
    <div class={isAddingTask ? "block w-full mt-5" : "hidden"}>
      <input
        type="text"
        placeholder="Task Description"
        onChange={(e) => setTask((e.target as HTMLInputElement).value)}
        class="w-full border-2 rounded-md mt-2 p-5 text-left border-blue-500 focus:border-blue-600 outline-none"
      />
      <div class="w-full flex items-center justify-between">
        <button
          onClick={() => setIsAddingTask(false)}
          class="bg-red-500 hover:bg-red-600 rounded-md py-1 px-10 text-gray-100 transition-colors focus:outline-none outline-none mt-5"
        >
          Cancel
        </button>
        <button
          onClick={() => addTask()}
          class="bg-blue-500 hover:bg-blue-600 rounded-md py-1 px-10 text-gray-100 transition-colors focus:outline-none outline-none mt-5"
        >
          Add
        </button>
      </div>
    </div>
  );
}
