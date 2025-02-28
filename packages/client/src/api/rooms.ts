import { RoomDetails } from '@ws-chat/common/src';

export const getRoom = async (roomId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:4000/rooms/${roomId ?? ''}`, {
      headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
    });
    if (!res.ok) throw new Error(res.statusText);
    const response = (await res.json()) as RoomDetails;
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const leaveRoom = async (roomId: string, userId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:4000/rooms/${roomId}/members/${userId}`, {
      headers: { 'Content-Type': 'application/json', Authorization: token ?? '' },
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(res.statusText);
    return true;
  } catch (err) {
    console.error(err);
  }
};
