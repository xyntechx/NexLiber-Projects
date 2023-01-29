"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import MDEditor from "@/components/MDEditor";
import { kMaxContentWidth } from "@/data/width";
import { useSetJournal } from "@/hooks/journals";
import useThrottle from "@/hooks/throttle";
import { useStore } from "@/store/useStore";

export default function EditorPage() {
  const router = useRouter();

  const title = useStore((state) => state.title);
  const body = useStore((state) => state.body);
  const setIdWithCreatedAt = useStore((state) => state.setIdWithCreatedAt);

  const { saveJournal } = useSetJournal();

  const throttledTitle = useThrottle(title, 3000);
  const throttledBody = useThrottle(body, 4000);

  const idWithCreatedAt = useMemo(() => {
    const createdAt = Date.now();
    const id = nanoid();
    return { id, createdAt };
  }, []);

  useEffect(() => {
    const { id, createdAt } = idWithCreatedAt;

    const journal = {
      id,
      title: throttledTitle,
      body: throttledBody,
      createdAt,
    };

    saveJournal(journal);

    setIdWithCreatedAt({ id, createdAt });
  }, [throttledTitle, throttledBody, idWithCreatedAt]);

  return (
    <SMain data-color-mode="dark">
      <Header heading={"Slate Editor"} subHeading={"Express your thoughts!"}>
        <Button onClick={() => router.push(`/${idWithCreatedAt.id}`)}>
          View Journal
        </Button>
      </Header>
      <SEditor>
        <SContent>
          <SLabel>Title</SLabel>
          <Input />
        </SContent>
        <SContent>
          <SLabel>Body</SLabel>
          <MDEditor />
        </SContent>
      </SEditor>
    </SMain>
  );
}

const SMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SEditor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 4rem);
  max-width: ${kMaxContentWidth};
  margin-bottom: 5rem;
`;

const SContent = styled.div`
  width: 100%;
  margin: 0 0 1rem;
`;

const SLabel = styled.p`
  font-size: 1rem;
  color: #bcbdd0;
  margin: 0 0 0.2rem;
`;
