import { Inter } from "@next/font/google";
import React from "react";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

import { kRadiusS } from "@/data/borderRadius";

const Button = ({
  children,
  onClick,
  loading,
  loadingText,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
}) => {
  return (
    <SButton disabled={loading} onClick={onClick}>
      {loading ? loadingText || "loading..." : children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button`
  all: unset;
  cursor: pointer;
  display: grid;
  place-items: center;
  border-radius: ${kRadiusS};
  color: #ffffff;
  height: 2rem;
  font-weight: 600;
  font-family: ${inter.style.fontFamily};
  line-height: 20px;
  font-size: 0.9rem;
  text-align: center;
  transition: all 200ms ease;
  padding: 10px 22px;
  user-select: none;
  background-color: #eb006c;

  &:hover {
    background-color: #f42282;
  }

  &:active {
    background-color: #c6005b;
  }

  &:disabled {
    background-color: #eb006c;
    opacity: 0.7;
    cursor: default;
  }
`;
