import { immer } from "zustand/middleware/immer";

type State = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
};

type Actions = {
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setIdWithCreatedAt: ({
    id,
    createdAt,
  }: {
    id: string;
    createdAt: number;
  }) => void;
};

export default immer<State & Actions>((set) => ({
  id: "",
  title: "",
  body: "",
  createdAt: 0,
  setTitle: (title: string) =>
    set((state) => {
      state.title = title;
    }),
  setBody: (body: string) =>
    set((state) => {
      state.body = body;
    }),
  setIdWithCreatedAt: ({ id, createdAt }) =>
    set((state) => {
      state.id = id;
      state.createdAt = createdAt;
    }),
}));
