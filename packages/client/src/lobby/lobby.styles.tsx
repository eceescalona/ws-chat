import { styled } from 'styled-components';

export const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 690px;
`;

export const CreateButton = styled.button`
  background-color: #afb3f7;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  align-self: flex-end;
`;

export const LobbyFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 345px;
  gap: 6px;
`;

export const RoomNameLabel = styled.label`
  font-size: small;
  font-weight: 600;
`;
