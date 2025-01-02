import { Column } from "@/components";
import { useContext } from "react";
import { AssessmentContext } from "../../context";
import styled from "styled-components";

const Paragraph = styled.p`
  margin: 0;
`;

interface Props {
  isTemplate?: boolean;
}

export const Heading = ({ isTemplate }: Props) => {
  const { config, tenderName } = useContext(AssessmentContext);
  return (
    <Column span={10} margin="0 0 2rem">
      <h1>{config?.name}</h1>
      {!isTemplate && (
        <>
          <h2>Review your assessment answers</h2>
          <Paragraph>
            Thank you for completing your assessment for {tenderName}. You can
            review your answers below and when you are ready, please submit your
            assessment.
          </Paragraph>
        </>
      )}
    </Column>
  );
};
