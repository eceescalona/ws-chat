/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import { addMessage, getMessagesByRoom, MessageInput } from './messages/messages.controller';
import { Client } from 'pg';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createUser, logUserIn, logUserInWithToken } from './user/user.controller';
import { CreateUserInput, LoginUserInput } from './user/user.repository';
import { auth } from './auth/auth.middleware';
import {
  addMember,
  createRoom,
  getAllRooms,
  getRoom,
  removeMember,
} from './rooms/rooms.controller';
import { CreateRoomInput, EventResponse, UserDetails } from '@ws-chat/common/src';
import { emitWithRetry } from './web-socket/emit-with-retry';

const app = express();
const db = new Client();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

async function clientConnect() {
  await db.connect();
  console.log('Postgres database connected');
}

app.use(express.json());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/messages', auth, async (req: Request, res: Response) => {
  try {
    const message = await addMessage({ db }, req.body as MessageInput);
    if (!message) throw new Error('Message creation failed');

    // emit event to send message data to connected clients
    // io.to(message.roomId).emit('chat message', message); old
    await emitWithRetry(io, message.roomId, 'chat message', message);

    res.status(201).send(message);
  } catch (err) {
    res.status(500).send();
  }
});

app.post('/room', auth, async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateRoomInput;
    const result = await createRoom({ db }, body);
    if (!result) throw new Error('Could not create room');

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

app.post('/rooms/:roomId/members', auth, async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { id: userId } = req.body as UserDetails;
    const result = await addMember({ db }, { roomId, userId });
    if (!result) throw new Error('Could not add member to room');

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

app.delete('/rooms/:roomId/members/:userId', auth, async (req: Request, res: Response) => {
  try {
    const { roomId, userId } = req.params;
    const result = await removeMember({ db }, { roomId, userId });
    if (!result) throw new Error('Could not remove member from room');

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

app.get('/rooms', auth, async (_: Request, res: Response) => {
  const rooms = await getAllRooms({ db });
  res.send(rooms);
});

app.get('/rooms/:roomId', auth, async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await getRoom({ db }, roomId);
  res.send(room);
});

app.get('/rooms/:roomId/messages', auth, async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = await getMessagesByRoom({ db }, roomId);
  res.send(room);
});

app.post('/user/new', async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateUserInput;
    const result = await createUser({ db }, body);

    res.status(200).send(result);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.status(500).send({ error: 'Unexpected error' });
    return;
  }
});

app.post('/user/login', async (req: Request, res: Response) => {
  const userDetails = await logUserIn({ db }, req.body as LoginUserInput);
  if (userDetails) {
    res.status(200).send(userDetails);
    return;
  }
  res.status(500).send({ error: 'Login failed' });
  return;
});

app.post('/user/verify', async (req: Request, res: Response) => {
  const userDetails = await logUserInWithToken({ db }, req.body as { token: string });
  if (userDetails) {
    res.status(200).send(userDetails);
    return;
  }
  res.status(500).send({ error: 'Login failed' });
  return;
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join room', async (roomId: string, callback: ({ status }: EventResponse) => void) => {
    await socket.join(roomId);
    callback({ status: 'room join acknowledged' });
  });
  socket.on('leave room', async (roomId: string, callback: ({ status }: EventResponse) => void) => {
    await socket.leave(roomId);
    callback({ status: 'room leave acknowledged' });
  });

  socket.on('disconnect', () => console.log('user disconnected'));
});

void clientConnect();
server.listen(4000, () => console.log('Server started on port 4000'));
