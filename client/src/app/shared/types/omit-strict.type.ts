export type OmitStrict<T extends {}, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
>;
