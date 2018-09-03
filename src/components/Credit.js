import React from "react";
import styled from "styled-components";

import { CreditEmoji } from "./Emoji";

const CreditContainer = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-size: 0.8rem;
`;

const CreditLink = styled.a.attrs({ target: "_blank" })`
  text-decoration: none;
  color: coral;
  margin-left: 0.3em;
`;

const Credit = () => (
  <CreditContainer>
    Made with <CreditEmoji /> by
    <CreditLink href="https://sungkim.co/">Sung Kim</CreditLink>
  </CreditContainer>
);

export default Credit;
