import { create } from "zustand";
import createBackgroundSlice from "./createBackgroundSlice";
import createCeramicSlice from "./createCeramicSlice";
import createEditorSlice from "./createEditorSlice";

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

type State = StateFromFunctions<
  [
    typeof createCeramicSlice,
    typeof createEditorSlice,
    typeof createBackgroundSlice
  ]
>;

export const useStore = create<State>((set, get, store) => ({
  ...createCeramicSlice(set, get, store),
  ...createEditorSlice(set, get, store),
  ...createBackgroundSlice(set, get, store),
}));
