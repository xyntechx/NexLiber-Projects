import { useRouter } from "next/navigation";
import { styled } from "styled-components";

import { kMaxContentWidthL } from "@/data/width";
import Button from "./Button";

const Header = ({
  heading,
  subHeading,
  children,
}: {
  heading: string;
  subHeading: string;
  children: React.ReactNode;
}) => {

  return (
    <SHeader>
      <div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          {heading}
        </h2>
        <p>{subHeading}</p>
      </div>
      {children}
    </SHeader>
  );
};

export default Header;

const SHeader = styled.div`
  display: flex;
  margin: 3rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  /* border-bottom: 1px solid #eb006c; */
  width: calc(100% - 4rem);
  max-width: ${kMaxContentWidthL};
`;
