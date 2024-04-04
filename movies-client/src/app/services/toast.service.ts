import { Injectable } from '@angular/core';
import { Severity } from '../models/severity.type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Array<Toast> = [];

  addToast(toast: Toast) {
    toast.id = this.generateId();
    toast.severity = toast.severity ?? 'info';
    toast.duration = toast.duration ?? 5000;

    this.toasts.push(toast);

    if (toast.duration !== 'sticky') {
      setTimeout(() => {
        if (toast.id) this.closeToast(toast.id);
      }, toast.duration);
    }
  }

  closeToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  private generateId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
}

type Toast = {
  summary: string;
  message: string;
  severity?: Severity;
  duration?: number | 'sticky';
  id?: string;
}