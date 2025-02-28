import { Message } from '@ws-chat/common/src';
import { Context } from '../db/connection';
import { MessageInput } from './messages.controller';
import { v4 as uuid } from 'uuid';

interface RawMessageResponse {
  messageId: string;
  content: string;
  created: string;
  userId: string;
  roomId: string;
  userName: string;
  userEmail: string;
}
export const insertMessage = async (
  { db }: Context,
  message: MessageInput,
): Promise<Message | null> => {
  try {
    const messageId = uuid();
    const sql = `
      WITH inserted_message AS (
        INSERT INTO messages (id, content, user_id, room_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      )
      SELECT 
        m.id as "messageId", 
        m.content, 
        m.created,
        m.user_id as "userId", 
        m.room_id as "roomId", 
        u.name as "userName", 
        u.email as "userEmail"
      FROM inserted_message m
      INNER JOIN users u ON m.user_id = u.id;
      `;
    const values = [messageId, message.content, message.userId, message.roomId];

    const {
      rows: [msg],
    } = await db.query<RawMessageResponse>(sql, values);

    const formattedResponse: Message = {
      id: msg.messageId,
      content: msg.content,
      created: msg.created,
      roomId: msg.roomId,
      user: {
        id: msg.userId,
        name: msg.userName,
        email: msg.userEmail,
      },
    };

    return formattedResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMessages = async ({ db }: Context, roomId: string): Promise<Message[]> => {
  try {
    const sql = `
      SELECT 
        m.id as "messageId", 
        m.content, 
        m.user_id as "userId", 
        m.room_id as "roomId", 
        u.name as "userName", 
        u.email as "userEmail"
      FROM messages m
      INNER JOIN users u ON m.user_id = u.id
      WHERE m.room_id = $1
      ORDER BY m.created ASC
      `;
    const values = [roomId];

    const { rows, rowCount } = await db.query<RawMessageResponse>(sql, values);

    if (!rowCount) return [];

    const messages: Message[] = rows.map((msg: RawMessageResponse) => ({
      id: msg.messageId,
      content: msg.content,
      created: msg.created,
      roomId: msg.roomId,
      user: {
        id: msg.userId,
        name: msg.userName,
        email: msg.userEmail,
      },
    }));

    return messages;
  } catch (error) {
    console.error(error);
    return [];
  }
};
