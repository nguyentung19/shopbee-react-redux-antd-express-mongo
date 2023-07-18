import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* footer first */}
        <div className="footer-care">
          <h3 className="footer-title">Chăm sóc khách hàng</h3>

          <div className="footer-list">
            <p className="footer-item">Trung tâm trợ giúp</p>
            <p className="footer-item">Hướng dẫn mua hàng</p>
            <p className="footer-item">Hướng dẫn bán hàng</p>
            <p className="footer-item">Chăm sóc khách hàng</p>
          </div>
        </div>

        {/* footer second */}
        <div className="footer-about">
          <h3 className="footer-title">Về Shopee</h3>

          <div className="footer-list">
            <p className="footer-item">Tuyển dụng</p>
            <p className="footer-item">Giới thiệu về shopee Việt Nam</p>
            <p className="footer-item">Điều khoản Shopee</p>
            <p className="footer-item">Kênh người bán</p>
          </div>
        </div>

        {/* footer third */}
        <div className="footer-social">
          <h3 className="footer-title">Theo dõi chúng tôi trên</h3>

          <div className="footer-list">
            <p className="footer-item">
              <FacebookOutlined />
              <span> Facebook </span>
            </p>
            <p className="footer-item">
              <InstagramOutlined />
              <span> Instagram</span>
            </p>
            <p className="footer-item">
              <LinkedinOutlined />
              <span> Linkedin </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
