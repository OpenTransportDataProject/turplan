import styled from "styled-components";

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 242, 242);
`;

export const MapButton = styled.button`
  display: inline-block;
  padding: 20px;
  font-size: 1em;
  background-color: rgb(86, 115, 163);
  border: 2px solid rgb(58, 77, 109);
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
`;
export const PageContentContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  padding: 10%;
  font-size: 18px;
  color: grey;
  background-color: #fff;
`;

export const PageContentHeader = styled.p`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1em;
  flex: 1;
`;

export const PageBanner = styled.img`
  width: 100%;
  height: auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.5em 0;
  min-height: 10em;
`;

export const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InfoHeader = styled.h3`margin: 0;`;

export const InfoText = styled.p`
  font-size: 1em;
  padding: 10px;
`;

export const Image = styled.div`
  flex: 1;
  background-image: url(${props => (props.imageUrl ? props.imageUrl : null)});
  border-radius: 10px;
`;

export const List = styled.ul`list-style-type: none;`;
