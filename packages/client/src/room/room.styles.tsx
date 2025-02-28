import { styled } from 'styled-components';

export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 100%;
  margin: 0;
`;

export const ChatContainer = styled.div`
  overflow: scroll;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
`;

export const RoomBodyContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 0;
  justify-content: space-between;
  height: 500px;
  width: 690px;
`;

export const BackButton = styled.button`
  background-color: #afb3f7;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  align-self: flex-start;
`;
