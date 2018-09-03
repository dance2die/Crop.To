import React from "react";
import PropTypes from "prop-types";

// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md#accessible-emoji
const Emoji = ({ children, ariaLabel }) => (
  <span role="img" aria-label={ariaLabel}>
    {children}
  </span>
);

Emoji.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

const CreditEmoji = () => (
  <span role="img" aria-label="heart" style={{ color: "red" }}>
    ❤
  </span>
);

export { CreditEmoji };
export default Emoji;
