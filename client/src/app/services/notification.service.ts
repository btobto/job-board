import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GLOBAL_MSG_SERVICE_KEY } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showMessage(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) {
    this.messageService.add({
      key: GLOBAL_MSG_SERVICE_KEY,
      severity,
      summary,
      detail,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
