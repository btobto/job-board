import { Transform } from 'class-transformer';

export function DefaultValue(defaultValue: any) {
  return Transform((target: any) => target || defaultValue);
}
