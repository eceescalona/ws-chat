import { getMessages, insertMessage } from './messages.repository';
import { Context } from '../db/connection';
import { Message } from '@ws-chat/common/src';

export interface MessageInput {
  content: string;
  userId: string;
  roomId: string;
}

export const getMessagesByRoom = async (ctx: Context, roomId: string): Promise<Message[]> =>
  await getMessages(ctx, roomId);

export const addMessage = async (ctx: Context, message: MessageInput): Promise<Message | null> =>
  await insertMessage(ctx, message);
