import React from "react";
import styled from "styled-components";

const CreditContainer = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-size: 0.8rem;
`;

const CreditLink = styled.a`
  text-decoration: none;
  color: coral;
  margin-left: 0.3em;
`;

const CreditEmoji = styled.span`
  color: red;
`;

const Credit = () => (
  <CreditContainer>
    Made with <CreditEmoji>❤</CreditEmoji> by
    <CreditLink href="https://sungkim.co/">Sung Kim</CreditLink>
  </CreditContainer>
);

export default Credit;
