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
`;

const StyledHeading = styled(Heading)`
  ${getTitleFontFamily};
  color: white;
`;

const StyledSubhead = styled(Subhead)`
  ${getDefaultFontFamily};
  color: white;
`;

const Title = () => (
  <TitleContainer>
    <StyledHeading fontSize={3}>Crop.to</StyledHeading>
    <StyledSubhead fontSize={1}>Crop an image by 1000x420</StyledSubhead>
  </TitleContainer>
);

export default Title;
