import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  padding: 1rem 0;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
`;

export const Column = styled.div<{ span?: number }>`
  grid-column: span ${({ span }) => span || 1};
`;

export const FluidContainer = styled.div`
  width: 100%;
`;
