import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import ProjectData from "../islands/ProjectData.tsx";

export default function Project(props: PageProps) {
  return (
    <>
      <Head>
        <title>{props.params.project.split("%20").join(" ")}</title>
      </Head>
      <main class="flex flex-col items-center justify-start my-10 p-4 mx-auto max-w-screen-lg">
        <ProjectData title={props.params.project.split("%20").join(" ")} />
      </main>
    </>
  );
}
