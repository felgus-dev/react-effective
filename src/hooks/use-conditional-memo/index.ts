import { useCoreReactive } from "../../core/useCoreReactive";

export const useConditionalMemo = <T,>(factory: () => T, deps?: React.DependencyList) => {
  const [value] = useCoreReactive(factory, deps);
  return value;
};