export type NotNullNorUndefined<T> = T extends null ? never : T;
