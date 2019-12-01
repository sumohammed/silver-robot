import React from "react";

const Svg = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="arcs"
    {...props}
  >
    {props.children}
  </svg>
);

export default Svg;
