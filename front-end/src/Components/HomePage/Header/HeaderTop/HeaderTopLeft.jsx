import React from "react";
import { Link } from "react-router-dom";
import { FacebookOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function HeaderTopLeft() {
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);

  return (
    <>
      <span className="header-left-item">
        <Link
          to="/productLike"
          className="header-link"
          disabled={currentUser ? false : true}
        >
          Danh sách yêu thích
        </Link>
      </span>
      <span className="header-left-item">
        <Link
          to="/cartCheck"
          className="header-link"
          disabled={currentUser ? false : true}
        >
          Kiểm tra đơn hàng
        </Link>
      </span>
      {currentUser?.role === "admin" && (
        <span className="header-left-item">
          <Link to="/admin" className="header-link">
            Vào trang quản trị
          </Link>
        </span>
      )}
      {/* <span className="header-left-item">
        <Link
          to="/admin"
          className="header-link"
        >
          Vào trang quản trị
        </Link>
      </span> */}
      <span className="header-left-item">
        Kết nối
        <Link
          to="https://www.facebook.com/ShopeeVN"
          className="header-link"
          target="_blank"
        >
          &nbsp; <FacebookOutlined className="header-left-icon" />
        </Link>
      </span>
    </>
  );
}
