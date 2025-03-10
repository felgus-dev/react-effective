import { z } from "zod";
import React from 'react';
import { Config } from "./types";

type UseStable<T> = [React.RefObject<z.ZodType<T, z.ZodTypeDef, T>>,React.RefObject<Config | undefined>]
export const useStable = <T>(schema: z.ZodType<T>, config?: Config): UseStable<T> => {
  const configStable = React.useRef(config);
  const schemaStable = React.useRef(schema);

  React.useEffect(() => {
    configStable.current = config;
    schemaStable.current = schema;
  });

  return [schemaStable, configStable];
};