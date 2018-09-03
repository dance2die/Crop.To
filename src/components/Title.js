import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Heading, Subhead } from "rebass-next";

import {
  theme,
  getDefaultFontFamily,
  getTitleFontFamily,
  getFlexColumnDirection
} from "../theme";

const TitleContainer = styled.div`
  ${getFlexColumnDirection};
  padding: 0.5em 2em;
  border: 0.23em dashed white;
  background-color: hotpink

  &:before {
    content: '✂️';
    margin-top: -1.4em;
  }
`;

const StyledHeading = styled(Heading)`
  ${getTitleFontFamily};
  letter-spacing: 0.325rem;
  color: white;
`;

const StyledSubhead = styled(Subhead)`
  ${getDefaultFontFamily};
  letter-spacing: 0.15rem;
  word-spacing: 0.15rem;
  color: white;
`;

const Title = () => (
  <TitleContainer>
    <StyledHeading fontSize={3}>Crop.to</StyledHeading>
    <StyledSubhead fontSize={1} mt={1}>
      Crop an image by 1000x420
    </StyledSubhead>
  </TitleContainer>
);

export default Title;
