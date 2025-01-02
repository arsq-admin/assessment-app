import styled from "styled-components";
import { Column, Container } from "./Container";
import Supply25 from "@/assets/Supply25_Logo.png";
import { Box } from "@mui/material";

const ContainerFluid = styled.footer`
  background-color: #ebebeb;
  width: 100%;
  padding: 2.5rem 0;
`;

export const Footer = () => {
  return (
    <ContainerFluid>
      <Container>
        <Column span="1 / span 2">
          <Box>
            <img
              width="100%"
              alt="Assessment is powered by Supply25"
              src={Supply25}
            />
          </Box>
          <p>© 2024</p>
        </Column>
        <Column span="4 / span 4">
          <p style={{ margin: "0" }}>
            <b>Contact Us</b>
          </p>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li>support@supply25.com</li>
          </ul>
        </Column>
        <Column span="10 / span 2">
          <p style={{ margin: "0" }}>
            <b>Resources</b>
          </p>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </Column>
      </Container>
    </ContainerFluid>
  );
};
