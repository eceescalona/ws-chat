import { styled } from 'styled-components';
import { BodyContainer } from './components/body-container';
import { NavBar } from './components/nav-bar';

interface PageLayoutProps {
  children: React.ReactNode;
  heading: string;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #e8e7e7;
  height: 100vh;
`;

export const PageLayout = (props: PageLayoutProps) => {
  const { children, heading } = props;

  return (
    <PageContainer>
      <NavBar heading={heading} />
      <BodyContainer>{children}</BodyContainer>
    </PageContainer>
  );
};
