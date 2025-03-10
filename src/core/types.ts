import { ZodError } from "zod";

export type OnError = <T>(error: ZodError, prevState: T, unsafeNextState: T) => void;

export type Config = {
  onError?: OnError;
  strict?: boolean;
};