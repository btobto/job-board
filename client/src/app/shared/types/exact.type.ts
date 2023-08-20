export type Exact<T, U> = T extends U ? (Exclude<keyof T, keyof U> extends never ? T : never) : never;
