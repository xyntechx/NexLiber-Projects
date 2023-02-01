import { formatRelative } from "date-fns";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { useDeterministicJournal } from "@/hooks/journals";
import ErrorState from "./ErrorState";

const JournalContent = ({
  params,
  searchParams,
}: {
  params: { journal: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id = params.journal;

  console.log(searchParams);

  const { journal, error } = useDeterministicJournal({
    journalId: id,
    controller: searchParams["did"] as string,
    family: "kjzl6cwe1jw14a56j5t8vnpbdwfziyxze7rc110wyhp4ddhagyjdxbrcuurc3h6",
  });

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
