import { styled } from 'styled-components';

export const NavBarContainer = styled.div`
  display: flex;
  background: #7a93ac;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

export const NavBarItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 690px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const LoggedInUserDetail = styled.p`
  font-size: 0.8rem;
  max-width: 8rem;
  text-align: right;
`;

export const AuthButton = styled.button`
  background-color: #afb3f7;
  border: none;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  height: fit-content;
`;
