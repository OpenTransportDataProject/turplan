import styled from "styled-components";
import FaInfoCircle from 'react-icons/lib/fa/info-circle';

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
  @media (max-width:750px) {
      z-index:1;
      flex-direction: column;
      background: #eee;
      padding-bottom: 2px;
    }
`;

export const ToggleContainer = styled.div`
  flex: 1;
  margin: 0 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${props => props.error ? '2px solid #D8000C' : null};
`;


export const InfoError = styled(FaInfoCircle)`
  font-size: 1.5em;
  color: #D8000C;
`;

export const TripDescriptionContainer = styled.div`
  max-height: 200px;
  overflow: auto;
  border-left: 1px solid rgba(0,0,0,0.2);
  padding: 4px;
  margin: 4px;
`;

export const TagContainer = styled.div`
  margin: 4px;
  border-radius: 4px;
  background-color: #75f19e;
  padding: 4px;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
`;

export const InlineTagsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const ToggleStyle = {
  textAlign: 'right',
  width: '50%',
}
