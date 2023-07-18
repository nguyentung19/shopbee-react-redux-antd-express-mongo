import React from "react";
import "./HeaderBottom.scss";
import HeaderLogo from "./HeaderLogo";
import HeaderSearch from "./HeaderSearch";
import HeaderCartIcon from "./HeaderCartIcon";

export default function HeaderBottom() {
  return (
    <div className="header-bottom">
      <div className="container header-list">
        <HeaderLogo />
        <HeaderSearch />
        <HeaderCartIcon />
      </div>
    </div>
  );
}
