import React from "react";
import styled from "styled-components";
import { Heading } from "rebass-next";
import { getDefaultFontFamily } from "../theme";

const TitleContainer = styled(Heading)`
  ${getDefaultFontFamily};
  color: white;
`;

const Title = () => (
  <TitleContainer fontSize={3}>Crop Files by 1000x420</TitleContainer>
);

export default Title;
