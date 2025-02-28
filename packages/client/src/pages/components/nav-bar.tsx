import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/use-auth.hook';
import { UserDetails } from '@ws-chat/common/src';
import {
  AuthButton,
  ButtonGroup,
  LoggedInUserDetail,
  NavBarContainer,
  NavBarItems,
} from './nav-bar.styles';

export const NavBar = ({ heading }: { heading: string }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const onLogout = (data: UserDetails | null) => {
    if (data === auth.user) auth.logout();
  };

  return (
    <NavBarContainer>
      <NavBarItems>
        <h1>{heading}</h1>
        <ButtonGroup>
          {auth.user ? (
            <>
              <LoggedInUserDetail>
                Logged in as <strong>{auth.user.email}</strong>
              </LoggedInUserDetail>
              <AuthButton onClick={() => onLogout(auth.user)}>Logout</AuthButton>
            </>
          ) : (
            <>
              <AuthButton onClick={() => navigate('/login')}>Login</AuthButton>
              <AuthButton onClick={() => navigate('/register')}>Register</AuthButton>
            </>
          )}
        </ButtonGroup>
      </NavBarItems>
    </NavBarContainer>
  );
};
