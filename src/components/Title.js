import React from "react";
import styled from "styled-components";
import { Box } from "rebass-next";

const TitleContainer = styled(Box)`
  font-family: ${props => props.theme.fontFamily};
  color: white;
`;

const Title = () => <TitleContainer>Crop Files by 1000x420</TitleContainer>;

export default Title;
