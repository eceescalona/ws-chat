import { useAuth } from '../auth/use-auth.hook';
import { RoomDetails } from '@ws-chat/common/src';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RoomList } from './room-list';
import { useNavigate } from 'react-router-dom';
import { CreateButton, LobbyContainer, LobbyFormContainer, RoomNameLabel } from './lobby.styles';
import { socket } from '..';

type RoomName = Pick<RoomDetails, 'name'>;

export const Lobby = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const token = auth.getToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomName>();

  const handleCreateRoom: SubmitHandler<RoomName> = async (data: RoomName) => {
    try {
      if (!token) throw new Error('Not logged in');
      const res = await fetch(`http://localhost:4000/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ name: data.name, owner: auth.user?.id }),
      });
      if (!res.ok) throw new Error(res.statusText);

      const response = (await res.json()) as RoomDetails;

      socket.emit('join room', response.id);

      navigate(`/lobby/room/${response.id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <LobbyContainer>
      <h3>Welcome to the Lobby!</h3>
      <LobbyFormContainer onSubmit={(e) => void handleSubmit(handleCreateRoom)(e)}>
        <RoomNameLabel htmlFor="name">Room name</RoomNameLabel>
        <input
          placeholder="Enter a room name"
          {...register('name', { required: true })}
          type="text"
        />
        {errors.name && <span>[Room Name]: {errors.name.message}</span>}
        <CreateButton type="submit">Create Room</CreateButton>
      </LobbyFormContainer>
      <RoomList />
    </LobbyContainer>
  );
};
