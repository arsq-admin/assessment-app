import styled from "styled-components";

const IndicatorWrapper = styled.div`
  height: 1.45rem;
  display: flex;
  align-items: center;
  flex: 15px 0 0;
  margin-left: 11px;
`;

const Indicator = styled.div<{ $isActive: boolean }>`
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: ${({ $isActive }) =>
    $isActive ? "#535353" : "transparent"};
  width: 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Text = styled.span<{ $isActive: boolean }>`
  font-size: 0.9rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
`;

interface Props {
  title: string;
  isActive: boolean;
}

export const Subsection = ({ title, isActive }: Props) => {
  return (
    <Container>
      <IndicatorWrapper>
        <Indicator $isActive={isActive} />
      </IndicatorWrapper>
      <Text $isActive={isActive}>{title}</Text>
    </Container>
  );
};
