import { useRef, useState, useEffect } from "react";

type ReturnedEffects = {
  [key: string]: (...args: unknown[]) => void;
};
type Cleanup = {
  cleanup?: () => void;
};

type StableFunction<T> = (
  set: React.Dispatch<React.SetStateAction<T>>,
  ref: React.RefObject<unknown>
) => ReturnedEffects & Cleanup;

export function useSideEffect <T>(stableEffect: StableFunction<T>, initialValue: T): [T, React.RefObject<unknown>, ReturnType<typeof stableEffect>] {
  const [value, setValue] = useState<T>(() => initialValue);
  const [effects, setEffects] = useState<ReturnedEffects>({});
  const flag = useRef(false);
  const ref = useRef(null);
  const stable = useRef(stableEffect);

  useEffect(() => {
    if (flag.current === false){
      flag.current = true;
      const {cleanup, ...effects} = stable.current(setValue, ref);
      setEffects(effects)
      return cleanup;
    }
  }, []);

  return [value, ref, effects]
};