import styled from "styled-components";

export const ContentContainer = styled.div`
  flex: 8;
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
  &:hover{
    cursor:pointer;
  }
`;
export const PageContent = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding:10%;
  font-size:18px;
  color: grey;
`;
export const PageBanner = styled.img`
  width:100%;
  height:auto;
`;

export const MapBanner = styled.div`
  background-image:url("images/karteksempel.jpg");
  width:100%;
  min-height:200px;
  padding:10px;
`;
export const Divider = styled.div`
  height: 1px;
  width: 90%;
  background-color: #ddd;
  position: relative;
  margin-bottom:40px;
`;
