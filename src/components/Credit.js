import React, { Fragment } from "react";
import styled from "styled-components";

const CreditLink = styled.a`
  text-decoration: none;
  color: coral;
  margin-left: 0.3em;
`;

const CreditEmoji = styled.span`
  color: red;
`;

const Credit = () => (
  <Fragment>
    Made with <CreditEmoji>❤</CreditEmoji> by
    <CreditLink href="https://sungkim.co/">Sung Kim</CreditLink>
  </Fragment>
);

export default Credit;
