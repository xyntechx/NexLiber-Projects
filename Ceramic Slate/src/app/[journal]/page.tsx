"use client";

import { styled } from "styled-components";

import JournalContent from "@/components/JournalContent";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export default function Journal({ params }: { params: { journal: string } }) {
  const bgState = useStore((state) => state.setBackgroundState);

  useEffect(() => {
    bgState({ showBg: true });
  }, []);

  return (
    <SMain>
      <JournalContent params={params} />
    </SMain>
  );
}

const SMain = styled.main`
  display: flex;
  justify-content: center;
`;
