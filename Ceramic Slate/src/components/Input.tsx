import { useStore } from "@/store/useStore";
import { styled } from "styled-components";

const Input = () => {
  const title = useStore((state) => state.title);
  const setTitle = useStore((state) => state.setTitle);

  return (
    <SInput
      type="text"
      value={title}
      autoComplete="off"
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    />
  );
};

export default Input;

const SInput = styled.input`
  font-family: monospace;
  font-size: 1rem;
  border-radius: 16px;
  color: #ffffff;
  background: #0e101b;
  border: 1.8px solid #50546c;
  resize: none;
  outline: none;
  width: 100%;
  max-width: 30rem;
  height: 2.8rem;
  padding: 10px 8px;
`;
