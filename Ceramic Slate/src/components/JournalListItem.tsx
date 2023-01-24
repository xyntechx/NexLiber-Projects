import Link from "next/link";
import { styled } from "styled-components";

const JournalListItem = ({
  id,
  title,
  body,
  last,
}: {
  id: string;
  title: string;
  body: string;
  last?: boolean;
}) => {
  return (
    <SJournalListItem last={last}>
      <Link href={`/${id}`} style={{ cursor: "pointer" }}>
        <h2
          style={{
            fontSize: "1.6rem",
            lineHeight: "1.2",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h2>
        <p style={{ lineHeight: "2" }}>{body}</p>
      </Link>
    </SJournalListItem>
  );
};

export default JournalListItem;

const SJournalListItem = styled.div<{ last?: boolean }>`
  display: flex;
  width: calc(100% - 4rem);
  max-width: 50rem;
  padding-bottom: 2rem;
  margin: 0 2rem 2rem;
  border-bottom: ${({ last }) => (last ? "none" : "1px solid #eb006c")};
`;
