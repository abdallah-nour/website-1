import React from 'react';
import styled from '@emotion/styled';
import { Container } from './commonStyles';
import TransparentHeader from './transparentHeader';

const HeaderContainer = styled.section`
  background-color: #f2f6fc;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = () => (
  <HeaderContainer>
    <Container>
      <TransparentHeader />
    </Container>
  </HeaderContainer>
);

export default Header;
