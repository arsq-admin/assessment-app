import styled from "styled-components";

const Indicator = styled.div<{ isActive: boolean }>`
  background-color: #ffffff;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: ${({ isActive }) => (isActive ? "#535353" : "transparent")};
  flex: 15px 0 0;
  margin-left: 11px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: 0.9rem;
`;

interface Props {
  title: string;
  isActive: boolean;
}

export const Subsection = ({ title, isActive }: Props) => {
  return (
    <Container>
      <Indicator isActive={isActive} />
      <Text>{title}</Text>
    </Container>
  );
};
