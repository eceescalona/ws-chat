import { Message } from '@ws-chat/common/src';
import { useAuth } from '../../auth/use-auth.hook';
import { StyledAvatar, MessageContainer, StyledMessage } from './chat-message.styles';

export const ChatMessage = ({
  message: {
    user: { name, id: userId },
    id,
    content,
  },
}: {
  message: Message;
}) => {
  const auth = useAuth();
  const mine = auth.user?.id === userId ? 'true' : 'false';

  return (
    <MessageContainer>
      <StyledAvatar $mine={mine}>{name[0].toUpperCase() || '#'}</StyledAvatar>
      <StyledMessage key={id}>{content}</StyledMessage>
    </MessageContainer>
  );
};
