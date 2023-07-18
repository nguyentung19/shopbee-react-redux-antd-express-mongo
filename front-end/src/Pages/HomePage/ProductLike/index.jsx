import { Badge, Card, List } from "antd";
import { LikeOutlined, ShoppingOutlined } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actCartProduct,
} from "../../../store/client/productClient/action.productClient";

export default function ProductLike() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);
  const { products } = useSelector((state) => state.ProductClient);
  const productsLike = products.filter((product) => product.like === true);

  useEffect(() => {
    if (!currentUser) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="body-background">
      <div className="container">
        {/* header */}
        <div className="home-title">
          <h2>Sản phẩm được yêu thích</h2>
        </div>

        {/* body */}
        <List
          grid={{ gutter: 8, column: 5 }}
          dataSource={productsLike}
          style={{ textAlign: "center" }}
          renderItem={(product) => {
            return (
              <List.Item>
                <Badge.Ribbon text={product.category}>
                  <Card
                    cover={
                      <img
                        src={product.image.path}
                        alt={product.name}
                        style={{
                          width: 200,
                          height: 200,
                          objectFit: "contain",
                          margin: "auto",
                        }}
                      />
                    }
                    actions={[
                      <LikeOutlined
                        style={{
                          fontSize: 20,
                          color: product.like ? "red" : "",
                        }}
                      />,
                      <ShoppingOutlined
                        style={{
                          fontSize: 20,
                          color: product.cart > 0 ? "blue" : "",
                        }}
                        onClick={() => {
                          if (currentUser) {
                            dispatch(actCartProduct(product._id));
                          }
                        }}
                      />,
                    ]}
                  >
                    <Card.Meta
                      title={product.name}
                      description={product.price.toLocaleString("es-us")}
                    />
                  </Card>
                </Badge.Ribbon>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}
