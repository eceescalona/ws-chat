import { Lobby } from '../lobby/lobby';
import { PageLayout } from './page-layout';

export const LobbyPage = () => {
  return (
    <PageLayout heading="Lobby">
      <Lobby />
    </PageLayout>
  );
};
