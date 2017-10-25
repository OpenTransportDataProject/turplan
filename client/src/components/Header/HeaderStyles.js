import styled from "styled-components";

export const HeaderContainer = styled.div`
  flex: 1;
  background-color: rgb(58, 77, 109,0.4);
  background-image:url("images/dd.jpg");
  background-size:cover;
`;

export const MainTitle = styled.h1`
  font-size: 50px;
  color: white;
  text-align:center;
  @media(max-width:768px){
    text-align:left;
    margin-left:10%;
  }
`;

export const PromoText = styled.div`
  color: white;
  text-align:left;
  margin-left:10%;
  margin-bottom:40px;
  max-width:50%;
  font-size:18px;
  @media(max-width:768px){
    max-width:80%;
  }
`;

export const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const SettingsImg = styled.img`
  width: 32px;
  height: 32px;
`;

export const MapButton = styled.button`
  display: inline-block;
  padding: 20px;
  font-size: 1em;
  background-color: #ddd;
  border: none;
  border-radius: 5px;
  &:hover{
    cursor:pointer;
  }
`;
