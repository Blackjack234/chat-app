import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect     {
    @WebSocketServer() server: Server;

    handleConnection(client: any, ...args: any[]) {
        console.log('client connected: ', client.id);
    }

    handleDisconnect(client: any) {
        console.log('client disconnected: ',client.id)
    }

    @SubscribeMessage('newMessage')
    handelMessage(client: Socket, message: any) {
        console.log(message);

        client.emit('reply', message === 'hello!' ? 'hi there' : "I don't understand");

        this.server.emit('reply', 'broadcasting...')

    }
}