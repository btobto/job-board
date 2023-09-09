import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): unknown {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      value = '//' + value;
    }

    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
