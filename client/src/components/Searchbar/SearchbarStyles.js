import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
`;

export const ContentContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: row;
  background-color: rgb(144, 173, 204);
`;

export const SearchButton = styled.button`
  display: inline-block;
  padding: 5px;
  font-size: 1em;
  background-color: rgb(86, 115, 163);
  border: 2px solid rgb(58, 77, 109);
  border-radius: 2px;
  margin-left: 10px;
`;
