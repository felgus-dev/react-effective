import { useCoreReactive } from "../../core/useCoreReactive";

export const useMemoState = <T,>(factory: () => T, deps?: React.DependencyList) => {
  return useCoreReactive(factory, deps);
};