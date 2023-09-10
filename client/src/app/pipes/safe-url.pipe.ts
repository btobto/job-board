import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): SafeUrl {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      value = '//' + value;
    }

    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
