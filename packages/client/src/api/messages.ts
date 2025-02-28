import { Message } from '@ws-chat/common/src';

export const getMessages = async (roomId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:4000/rooms/${roomId}/messages`, {
      headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
    });
    if (!res.ok) throw new Error(res.statusText);
    const response = (await res.json()) as Message[];
    return response;
  } catch (err) {
    console.error('Failed to get messages', err);
    return [];
  }
};
