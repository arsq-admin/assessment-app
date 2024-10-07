import styled from "styled-components";

export const Container = styled.div<{ padding?: string }>`
  width: 100%;
  max-width: 1120px;
  padding: ${({ padding }) => padding || "1rem 0"};
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Column = styled.div<{
  span?: number | string;
  margin?: string;
}>`
  grid-column: ${({ span }) => {
    if (!span) return 1;
    return typeof span === "number" ? `span ${span}` : span;
  }};
  margin: ${({ margin }) => margin || "0"};
`;

export const FluidContainer = styled.div`
  width: 100%;
`;
