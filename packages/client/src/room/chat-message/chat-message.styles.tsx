import { styled } from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const StyledMessage = styled.p`
  margin: 0.5em;
`;

export const StyledAvatar = styled.div.attrs<{ $mine: string }>((props) => ({
  $mine: props.$mine || 'false',
}))`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.$mine === 'true' ? '#043764' : '#3e688c')};
  color: white;
  line-height: 24px;
  height: 24px;
  width: 24px;
`;
