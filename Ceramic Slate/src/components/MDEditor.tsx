"use client";

import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";

const _MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const MDEditor = () => {
  const body = useStore((state) => state.body)
  const setBody = useStore((state) => state.setBody)

  return (
    <_MDEditor
      style={{ width: "100%" }}
      value={body}
      onChange={(val) => {
        setBody(val!);
      }}
    />
  );
};

export default MDEditor;
