import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket | null = null;

  constructor() {}

  connect(): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(environment.SOCKET_ENDPOINT, {
        withCredentials: true, // crucial for sending cookies
      });

      this.socket.on('connect', () => {
        console.log('Connected to socket server:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });

      this.socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
      });
    }
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  emit(event: string, data: any): void {
    this.socket?.emit(event, data);
  }

  on<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket?.on(event, (data: T) => {
        subscriber.next(data);
      });
    });
  }

  off(event: string): void {
    this.socket?.off(event);
  }
}
