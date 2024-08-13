import styled from "styled-components";

const Paragraph = styled.p`
  margin: 0;
`;

export const MinimumRequiredLabel = () => {
  return (
    <Paragraph className="ds_hint-text">
      This is the minimum requirement.
    </Paragraph>
  );
};
