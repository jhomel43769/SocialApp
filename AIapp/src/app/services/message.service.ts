import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: any[] = [];

  addMessage(role: string, content: string) {
    this.messages.push({ role, content });
  }

  getMessages(): any[] {
    return this.messages;
  }

  clearMessages() {
    this.messages = [];
  }
}
