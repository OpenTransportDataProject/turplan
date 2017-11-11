import styled from "styled-components";

export const FooterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(58, 77, 109, 0.1);
  padding-left: 10px;
  padding-right: 10px;
  max-height: 200px;
  max-width:100%;
  box-sizing:border-box;
  @media (max-width:750px) {
      flex-direction: column;
    }
`;

export const FooterText = styled.p`
  font-size: 1em;
  color: black;
  padding: 10px;
`;

export const CustomerContainer = styled.div`justify-content: center;`;

export const NTNUImg = styled.img`
  src: url(${props => (props.src ? props.src : null)});
  height: 50px;
  padding-right: 100px;
`;

export const SINTEFImg = styled.img`
  src: url(${props => (props.src ? props.src : null)});
  height: 50px;
  padding: 10px;
`;

export const VegvesenImg = styled.img`
  src: url(${props => (props.src ? props.src : null)});
  height: 50px;
  padding: 10px;
`;
