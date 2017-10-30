import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';

export const Container = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 3em;
  height: 50%;
  background-color: rgb(86, 115, 163);
  border: none;
  border-radius: 2px;
  margin-left: 10px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchIcon = styled(FaSearch)`
  font-size: 1.5em;
  margin: 0 0.5em;
`;
