import { useStore } from "@/store/useStore";
import Image from "next/image";
import { styled } from "styled-components";

export const BgVariants = {};

const Background = () => {
  const showBg = useStore((state) => state.showBg);
  const variant = useStore((state) => state.variant);

  if (!showBg) return null;

  return (
    <SBackground>
      <Image
        src={"/background.svg"}
        alt={"bg"}
        style={{
          objectFit: "cover",
          zIndex: 0,
          objectPosition: "top",
          scale: 0.1,
        }}
        fill
        priority
      />
    </SBackground>
  );
};

export default Background;

const SBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
