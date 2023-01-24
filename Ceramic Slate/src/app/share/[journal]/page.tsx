"use client";

import { styled } from "styled-components";

import SharedJournalContent from "@/components/SharedJournalContent";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export default function Journal({
  params,
  searchParams,
}: {
  params: { journal: string };
  searchParams: { [key: string]: string | string[] };
}) {
  const bgState = useStore((state) => state.setBackgroundState);

  useEffect(() => {
    bgState({ showBg: true });
  }, []);

  return (
    <SMain>
      <SharedJournalContent params={params} searchParams={searchParams} />
    </SMain>
  );
}

const SMain = styled.main`
  display: flex;
  justify-content: center;
`;
