import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1em;
`;

export const Header = styled.div`
  flex: 0.3;
  font-size: 1.6em;
  color: #777;
  display:flex;
  justify-content: center;
  align-items: center;
`;

export const Searchcontainer = styled.div`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

export const MapContainer = styled.div`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  font-size: 1em;
  background-color: #ccc;
  border-radius: 2px;
  width: 4em;
  border: none;
  &:hover{
    cursor:pointer;
  }
`;

export const Row = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: row;
`;

export const ToggleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
