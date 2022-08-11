import { Button } from "antd";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledContainer = styled.div`
  padding: 2rem;
  min-height: 80vh;
`;

export const GridContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  row-gap: 2rem;
`;
