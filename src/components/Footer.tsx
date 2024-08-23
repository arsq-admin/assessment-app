import styled from "styled-components";
import { Container } from "./Container";

const ContainerFluid = styled.footer`
  background-color: #ebebeb;
  width: 100%;
  padding: 4rem 0;
`;

export const Footer = () => {
  return (
    <ContainerFluid>
      <Container></Container>
    </ContainerFluid>
  );
};
