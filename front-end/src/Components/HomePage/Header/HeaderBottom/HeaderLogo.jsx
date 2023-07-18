import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLogo() {
  return (
    <Link to="/">
      <img src="./images/shopee-logo.png" alt="" className="header-logo" />
    </Link>
  );
}
