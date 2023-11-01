'use-client';
import { TransportsEvents } from 'api-service';
import { Socket, io as sio } from 'socket.io-client';

class _SocketService {
  private io?: Socket;

  init() {
    this.io = sio(process.env['NEXT_PUBLIC_SOCKET_URL'] ?? '', {
      path: '/socket.io',
    });

    if (!this.io) {
      return;
    }
    this.io.on(TransportsEvents.start, message => {});
  }

  // destroy() {
  //   if (this.io) {
  //     this.io.disconnect();
  //   }
  // }
}

export const socket = new _SocketService();
