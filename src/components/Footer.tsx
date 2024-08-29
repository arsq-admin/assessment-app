import styled from "styled-components";
import { Container } from "./Container";

const ContainerFluid = styled.footer`
  margin-top: 5rem;
  background-color: #ebebeb;
  width: 100%;
  padding: 2rem 0;
`;

export const Footer = () => {
  return (
    <ContainerFluid>
      <Container></Container>
    </ContainerFluid>
  );
};
