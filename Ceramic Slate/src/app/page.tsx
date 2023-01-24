"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import JournalListItem from "@/components/JournalListItem";
import { useGetJournals } from "@/hooks/journals";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import { Else, If, Then } from "react-if";
import { styled } from "styled-components";

export default function Home() {
  const router = useRouter();
  const bgState = useStore((state) => state.setBackgroundState);

  const { journals, error } = useGetJournals();

  useEffect(() => {
    bgState({ showBg: false });
  }, []);

  console.log(journals);

  return (
    <SMain>
      <Header heading={"Slate"} subHeading={"Express your thoughts!"}>
        <Button onClick={() => router.push("/editor")}>Create Journal</Button>
      </Header>
      {
        <If condition={typeof journals !== "undefined" && journals.length > 0}>
          <Then>
            {journals?.map((journal, i, { length }) => (
              <JournalListItem {...journal} last={length - 1 === i && true} />
            ))}
          </Then>
          <Else>
            <EmptyState />
          </Else>
        </If>
      }
    </SMain>
  );
}

const SMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
