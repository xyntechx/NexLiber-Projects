import { useEffect, useState } from "preact/hooks";

interface ProjectData {
  title: string;
  description: string;
  tasks: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([{
    title: "",
    description: "",
    tasks: [],
  }]);

  useEffect(() => {
    let tempProjects = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes("Fresh Project Manager")) {
        const stored = JSON.parse(localStorage.getItem(key)!);
        tempProjects.push(stored);
      }
    }
    setProjects(tempProjects);
  }, []);

  return (
    <>
      <div class="grid grid-cols-1 gap-y-5 md:(grid-cols-2 gap-x-20 gap-y-10) w-full">
        {projects.length > 0 && projects[0].title.length > 0 &&
          (
            <>
              {projects!.map((project) => (
                <a
                  key={project.title}
                  href={`/${project.title}`}
                  class="border rounded-md border-gray-300 hover:border-gray-400 py-3 px-5 transition cursor-pointer flex items-center justify-start"
                >
                  <div class="w-3/5">
                    <h1 class="font-bold">{project.title}</h1>
                    <p class="text-gray-500">{project.description}</p>
                    <p class="text-gray-500 mt-2">
                      {project.tasks.length}{" "}
                      <span>
                        {project.tasks.length === 1 ? <>task</> : <>tasks</>}
                      </span>
                    </p>
                  </div>
                  <div class="flex items-center justify-end w-2/5">
                    <a
                      href={`/${project.title}`}
                      class="bg-blue-500 hover:bg-blue-600 rounded-md py-1 px-2 text-gray-100 transition-colors"
                    >
                      View
                    </a>
                  </div>
                </a>
              ))}
            </>
          )}
      </div>
      {!projects[0].title.length && (
        <div class="flex w-full m-0">
          <h1 class="my-6 w-full text-left m-0">No projects yet</h1>
        </div>
      )}
    </>
  );
}
