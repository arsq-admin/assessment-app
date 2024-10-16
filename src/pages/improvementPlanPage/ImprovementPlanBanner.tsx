import { Column, Container } from "@/components";
import styled from "styled-components";

const Banner = styled.div`
  background: #d9effc;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 0.9rem;
`;

export const ImprovementPlanBanner = () => {
  return (
    <Banner>
      <Container padding="0 2rem">
        <Column span={12}>
          You are now completing the improvement plan for your assessment.
        </Column>
      </Container>
    </Banner>
  );
};
