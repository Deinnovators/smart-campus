'use-client';
import useTripStore from '@webportal/zustores/trip.store';
import { TransportsEvents } from 'api-service';
import { Socket, io as sio } from 'socket.io-client';

class _SocketService {
  io?: Socket;

  init() {
    this.io = sio(process.env['NEXT_PUBLIC_SOCKET_URL'] ?? '', {
      transports: ['websocket'],
    });

    if (!this.io) {
      return;
    }
    this.io.on(TransportsEvents.start, d => {
      const { startTrip } = useTripStore.getState();
      startTrip(d);
    });
    this.io.on(TransportsEvents.update, d => {
      const { updateTrip } = useTripStore.getState();
      updateTrip(d);
    });
    this.io.on(TransportsEvents.finish, d => {
      const { finishTrip } = useTripStore.getState();
      finishTrip(d);
    });
  }
}

export const socket = new _SocketService();
