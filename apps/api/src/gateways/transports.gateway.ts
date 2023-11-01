import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Trip } from 'database';
import { Server } from 'http';

@WebSocketGateway(1339)
export class TransportGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('start_trip')
  handleStartTrip(@MessageBody() trip: Trip) {
    this.server.emit('start_trip', trip);
  }
  @SubscribeMessage('update_trip')
  handleUpdateTrip(@MessageBody() trip: Trip) {
    this.server.emit('update_trip', trip);
  }
  @SubscribeMessage('finish_trip')
  handleFinishTrip(@MessageBody() trip: Trip) {
    this.server.emit('finish_trip', trip);
  }
}
