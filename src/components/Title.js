import React from "react";
import styled from "styled-components";
import { Box } from "rebass-next";
import { getDefaultFontFamily } from "../theme";

const TitleContainer = styled(Box)`
  ${getDefaultFontFamily};
  color: white;
`;

const Title = () => <TitleContainer>Crop Files by 1000x420</TitleContainer>;

export default Title;
