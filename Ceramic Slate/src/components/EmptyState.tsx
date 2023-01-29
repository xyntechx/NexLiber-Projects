import { styled } from "styled-components";

const EmptyState = () => {
  return (
    <SEmptyState>
      <SContent>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            textAlign: "center",
            lineHeight: "1"
          }}
        >
          Hey 👋 there, welcome to Slate!
        </h2>
        <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
          click the 'Create Journal' button to get started
        </p>
      </SContent>
    </SEmptyState>
  );
};

export default EmptyState;

const SEmptyState = styled.div`
  color: green;
  margin: 7rem 2rem 2rem;
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
