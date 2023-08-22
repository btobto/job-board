import { Inject, Injectable, InjectionToken } from '@angular/core';
import { MessageService } from 'primeng/api';

export const GLOBAL_MSG_SERVICE_KEY = new InjectionToken<string>('msgKey');

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(@Inject(GLOBAL_MSG_SERVICE_KEY) private msgServiceKey: string, private messageService: MessageService) {}

  showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this.messageService.add({
      key: this.msgServiceKey,
      severity,
      summary,
      detail,
    });
  }

  showError(summary: string, detail: string) {
    this.showMessage('error', 'Error: ' + summary, detail);
  }

  clear() {
    this.messageService.clear();
  }
}
