import { Head } from "$fresh/runtime.ts";
import AddProject from "../islands/AddProject.tsx";

export default function NewProject() {
  return (
    <>
      <Head>
        <title>Fresh Project Manager | Add Project</title>
      </Head>
      <main class="flex flex-col items-center justify-center mx-auto max-w-screen-lg h-screen">
        <h1 class="text-2xl">Add Project</h1>
        <AddProject />
      </main>
    </>
  );
}
