import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  flex: 1;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 50%;
  height: 1.5em;
	font-size: 1em;
	border: 2px solid #aaa;
	border-radius: 2px;
`;

const Input = styled.input`
  width: 50%;
	padding: 0.5em;
	margin: 0.5em 0;
	border: 1px solid #eee;
	border-radius: 3px;
`;

const SearchContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LandingPage = () => {

  return (
    <Container>
      <Header>PIKE</Header>
      <SearchContainer>
      <Input
        placeholder="Search" type="text"
      />
      <Button>SØK</Button>
      </SearchContainer>
    </Container>
  );
};

export default LandingPage;
