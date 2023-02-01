import { CeramicClient } from "@ceramicnetwork/http-client";
import { original } from "immer";
import { immer } from "zustand/middleware/immer";

type State = {
  ceramic: CeramicClient | undefined;
};

type Actions = {
  addCeramicInstance: (ceramic: CeramicClient) => void;
  removeCeramicInstance: () => void;
};

export default immer<State & Actions>((set) => ({
  ceramic: undefined,
  addCeramicInstance: (ceramic: CeramicClient) =>
    set((state) => {
      state.ceramic = ceramic;
    }),
  removeCeramicInstance: () =>
    set(async (state) => {
      await original(state.ceramic)?.close();
      state.ceramic = undefined;
    }),
}));

