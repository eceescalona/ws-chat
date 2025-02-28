import { RoomDetailsWithMemberCount } from '@ws-chat/common/src';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/use-auth.hook';
import { useNavigate } from 'react-router-dom';
import { socket } from '..';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RoomItem = styled.li`
  padding: 0.5rem 0;
`;

export const RoomList = () => {
  const [rooms, setRooms] = useState<RoomDetailsWithMemberCount[]>([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const token = auth.getToken();

  const handleJoinRoom = async (roomId: string) => {
    try {
      if (!token) throw new Error('Not logged in');
      const res = await fetch(`http://localhost:4000/rooms/${roomId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ id: auth.user?.id }),
      });
      if (!res.ok) throw new Error(res.statusText);

      socket.emit('join room', roomId);

      navigate(`/lobby/room/${roomId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    async function getAllRooms() {
      const res = await fetch(`http://localhost:4000/rooms`, {
        headers: { Authorization: token ?? '' },
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as RoomDetailsWithMemberCount[];
      setRooms(response);
    }

    getAllRooms().catch((e) => console.error(e));
  }, []);

  return (
    <List>
      {rooms.length === 0 && <p>There are no rooms right now, try creating one.</p>}
      {rooms.map((r) => (
        <RoomItem key={r.id}>
          <button type="button" onClick={() => void handleJoinRoom(r.id)}>
            {r.name} (Member count: {r.memberCount})
          </button>
        </RoomItem>
      ))}
    </List>
  );
};
