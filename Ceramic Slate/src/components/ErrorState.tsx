import { styled } from "styled-components";

const ErrorState = ({ head, sub }: { head: string; sub: string }) => {
  return (
    <SErrorState>
      <SContent>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            textAlign: "center",
            lineHeight: "1",
          }}
        >
          {head}
        </h2>
        <p style={{ fontSize: "1.5rem", textAlign: "center" }}>{sub}</p>
      </SContent>
    </SErrorState>
  );
};

export default ErrorState;

const SErrorState = styled.div`
  display: flex;
  /* background-color: green; */
  height: 100vh;
  width: 100vw;
`;

const SContent = styled.div`
  margin: 20% auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
