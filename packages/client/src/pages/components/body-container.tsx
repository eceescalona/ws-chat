import { ReactNode } from 'react';
import { styled } from 'styled-components';

const BodyOuter = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
`;

const BodyInner = styled.div`
  display: flex;
  padding: 0 1rem;
`;

export const BodyContainer = ({ children }: { children: ReactNode }) => {
  return (
    <BodyOuter>
      <BodyInner>{children}</BodyInner>
    </BodyOuter>
  );
};
