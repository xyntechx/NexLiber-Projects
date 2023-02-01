import { useAuthConnect } from "@/hooks/authentication";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import styled from "styled-components";

import Button from "./Button";


const Auth = () => {
  const { isActivating, connect } = useAuthConnect();
  const bgState = useStore((state) => state.setBackgroundState);

  useEffect(() => {
    bgState({ showBg: true });
  }, []);

  return (
    <SAuth>
      <SContent>
        <SFlex></SFlex>

        <h2 style={{ fontSize: "1.2rem" }}>Welcome,</h2>
        <p style={{ marginBottom: "1rem" }}>
          Slate is your personal journal, express your thoughts, powered by
          Ceramic and IPFS!
        </p>
        <Button
          onClick={connect}
          loading={isActivating}
          loadingText="Connecting..."
        >
          Connect wallet
        </Button>
      </SContent>
    </SAuth>
  );
};

export default Auth;

const SAuth = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 28rem;
  background: #0e101b;
  border: 1.5px solid #50546c;
  border-radius: 1.5rem;
  height: 33rem;
  justify-content: space-between;
  padding: 2rem;
`;

const SFlex = styled.div`
  display: flex;
  flex: 1;
`;
