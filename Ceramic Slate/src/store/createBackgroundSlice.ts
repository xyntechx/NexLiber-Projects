import { immer } from "zustand/middleware/immer";

type State = {
  showBg: boolean;
  variant?: string;
};

type Actions = {
  setBackgroundState: ({ showBg, variant }: State) => void;
};

export default immer<State & Actions>((set) => ({
  showBg: false,
  variant: "",
  setBackgroundState: ({ showBg, variant = "" }) =>
    set((state) => {
      state.showBg = showBg;
      state.variant = variant;
    }),
}));
