import { Head } from "$fresh/runtime.ts";
import Projects from "../islands/Projects.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh Project Manager</title>
      </Head>
      <main class="flex flex-col items-center justify-start my-10 p-4 mx-auto max-w-screen-lg">
        <div class="w-full flex justify-between mb-10">
          <h1 class="font-bold text-2xl w-3/5 text-left">My Projects</h1>
          <a
            href="/new-project"
            class="bg-blue-500 hover:bg-blue-600 rounded-md py-1 px-2 text-gray-100 transition-colors w-2/5 md:w-1/5 flex items-center justify-center"
          >
            + Add Project
          </a>
        </div>
        <Projects />
      </main>
    </>
  );
}
