import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeaderCartIcon() {
  const {
    // products,
    cart,
  } = useSelector((state) => state.ProductClient);

  // const totalCart = products.reduce((total, product) => {
  //   return (total += product.cart);
  // }, 0);

  return (
    <Link
      to="/cart"
      style={{
        pointerEvents: (cart === 0 ? "none" : ""),
      }}
    >
      <Badge count={cart}>
        <ShoppingCartOutlined className="header-cart-icon" />
      </Badge>
    </Link>
  );
}
