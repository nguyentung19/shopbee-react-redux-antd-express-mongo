import React, { useState } from "react";
import { Badge, Button, Card, List, Select, Space, message } from "antd";
import { LikeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  actCartProduct,
  actFetchAllProductsClientAsync,
  actFilterProduct,
  actLikeProduct,
} from "../../../store/client/productClient/action.productClient";

// let currentPage = 1;
export default function HomeProduct() {
  const dispatch = useDispatch();
  const [loadingMore, setLoadingMore] = useState(false);

  let { products, count, filterCategory, page, queryString } = useSelector(
    (state) => state.ProductClient
  );

  const categoryListByName = useSelector(
    (state) => state.Category.categoryListByName
  );
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);
  const [messageApi, contextHolder] = message.useMessage();

  let filterProduct = products.filter((product) => {
    if (filterCategory !== "") {
      return product.category === filterCategory;
    }
    return product;
  });

  let searchProduct = filterProduct.filter((product) => {
    return product.name.toLowerCase().includes(queryString.toLowerCase());
  });

  return (
    <>
      {contextHolder}
      {/* title */}
      <div className="home-title">
        <h2>Sản phẩm</h2>

        <Space>
          <span>Lọc theo danh mục : </span>

          <Select
            defaultValue=""
            style={{ width: 150 }}
            onChange={(item) => {
              dispatch(actFilterProduct(item));
            }}
          >
            <Select.Option value="">Tất cả</Select.Option>
            {categoryListByName.map((category, index) => {
              return (
                <Select.Option value={category} key={index}>
                  {category}
                </Select.Option>
              );
            })}
          </Select>
        </Space>
      </div>

      <List
        grid={{ gutter: 8, column: 5 }}
        dataSource={searchProduct}
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
                      onClick={() => {
                        if (currentUser) {
                          dispatch(actLikeProduct(product._id));
                        } else {
                          messageApi.warning(
                            "Bạn cần phải đăng nhập để sử dụng chức năng này"
                          );
                        }
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
                        } else {
                          messageApi.warning(
                            "Bạn cần phải đăng nhập để sử dụng chức năng này"
                          );
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

      {page < count && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Button
            type="primary"
            loading={loadingMore}
            onClick={() => {
              setLoadingMore(true);
              dispatch(
                actFetchAllProductsClientAsync({
                  page: page + 1,
                })
              ).then(() => {
                setLoadingMore(false);
              });
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
