import { formatRelative } from "date-fns";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { useGetJournalById } from "@/hooks/journals";
import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import ErrorState from "./ErrorState";

const JournalContent = ({ params }: { params: { journal: string } }) => {
  const id = params.journal;
  const did = useStore((state) => state.ceramic?.did?.id);

  const { journal, error } = useGetJournalById(id);

  if (journal) {
    const { title, createdAt, body } = journal;
    const date = formatRelative(createdAt, new Date());

    return (
      <SJournalContent>
        <div>
          <SHeader>
            <STitle>{title}</STitle>
            <SDate>{date}</SDate>
          </SHeader>
          <SBody>
            <ReactMarkdown>{body}</ReactMarkdown>
          </SBody>
        </div>
        <SNav>
          <Link href="/">
            <SNavItems>
              <SIconContent>
                <Image src={"home.svg"} alt={"bg"} fill priority />
              </SIconContent>
              <p>home</p>
            </SNavItems>
          </Link>
          <Link href={`/editor/${id}`}>
            <SNavItems>
              <SIconContent>
                <Image src={"edit.svg"} alt={"bg"} fill priority />
              </SIconContent>
              <p>edit</p>
            </SNavItems>
          </Link>
          <Link href={`/share/${id}?did=${did}`}>
            <SNavItems>
              <SIconContent>
                <Image src={"share.svg"} alt={"bg"} fill priority />
              </SIconContent>
              <p>share</p>
            </SNavItems>
          </Link>
        </SNav>
      </SJournalContent>
    );
  } else {
    return (
      <ErrorState
        head="Sorry we couldn't find that 🥹"
        sub={(error as Error)?.message}
      />
    );
  }
};

export default JournalContent;

const SJournalContent = styled.div`
  padding: 2rem;
  background-color: #2d3140;
  width: calc(100% - 4rem);
  max-width: 50rem;
  border-radius: 1rem;
  margin: 4rem 2rem 2rem;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #eb006c;
  margin: 0 0 2rem;
`;

const SNav = styled.div`
  display: flex;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const SNavItems = styled.div`
  display: flex;
  align-items: center;
  background: #0e101b43;
  border-radius: 1rem;
  width: fit-content;
  padding: 0.8rem 1.3rem;
  margin-right: 1rem;
  cursor: pointer;
  transition: background ease 500ms;

  &:hover {
    background: #0e101b;
  }
`;

const SIconContent = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.7rem;
`;

const STitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-align: center;
`;

const SDate = styled.p`
  font-size: 0.9rem;
  line-height: 2;
  margin-bottom: 1rem;
`;

const SBody = styled.div`
  font-size: 1.1rem;
  line-height: 2;
`;
