import React from "react";
import "./Cart.scss";
import { Table, Image, Space, Button, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  actDeleteItem,
  actMinusCart,
  actPlusCart,
  actResetCart,
} from "../../../store/client/productClient/action.productClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actAddCartAsync } from "../../../store/admin/cart/cart.action";

export default function CartPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ProductClient.products);
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const productsToBuy = products.filter((product) => product.cart > 0);
  let updatedProductsToBuy = productsToBuy.map((product, index) => {
    return {
      key: index,
      ...product,
    };
  });

  useEffect(() => {
    if (updatedProductsToBuy.length === 0) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {contextHolder}
      <div className="body-background">
        <div className="container">
          <h2 className="cart-title">Giỏ hàng</h2>

          <Table
            columns={[
              {
                title: "Sản phẩm",
                dataIndex: "name",
              },
              {
                title: "Image",
                dataIndex: "image",
                render: (image) => {
                  return (
                    <Image
                      src={image.path}
                      width={100}
                      height={100}
                      alt={image.path}
                      style={{ objectFit: "contain" }}
                    />
                  );
                },
              },
              {
                title: "Giá bán",
                dataIndex: "price",
                render: (text) => {
                  return <span>{text.toLocaleString("es-us")}</span>;
                },
              },
              {
                title: "Số lượng",
                dataIndex: "cart",
                render: (text, record) => {
                  return (
                    <Space>
                      <Button
                        onClick={() => {
                          dispatch(actMinusCart(record._id));
                        }}
                      >
                        <MinusOutlined />
                      </Button>
                      <span style={{ margin: "0 10px" }}>{text}</span>
                      <Button
                        onClick={() => {
                          dispatch(actPlusCart(record._id));
                        }}
                      >
                        <PlusOutlined />
                      </Button>
                    </Space>
                  );
                },
              },
              {
                title: "Thành tiền",
                render: (value) => {
                  return (
                    <span
                      style={{
                        color: "red",
                        fontSize: 20,
                        fontWeight: "bolder",
                      }}
                    >
                      {(value.cart * value.price).toLocaleString()}
                    </span>
                  );
                },
              },
              {
                title: "Thao tác",
                render: (_, record) => {
                  return (
                    <Popconfirm
                      title="Are you sure?"
                      onConfirm={() => {
                        dispatch(actDeleteItem(record));
                      }}
                    >
                      <DeleteOutlined
                        style={{
                          fontSize: 24,
                          color: "red",
                        }}
                      />
                    </Popconfirm>
                  );
                },
              },
            ]}
            summary={(record) => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={4}>
                    <p
                      style={{
                        fontSize: 20,
                        textAlign: "right",
                      }}
                    >
                      Total
                    </p>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <p
                      style={{
                        color: "red",
                        fontSize: 20,
                        fontWeight: "bolder",
                      }}
                    >
                      {productsToBuy
                        .reduce((total, item) => {
                          return (total += item.price * item.cart);
                        }, 0)
                        .toLocaleString()}
                    </p>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell>
                    <Button
                      type="primary"
                      onClick={() => {
                        const totalCart = updatedProductsToBuy.map(
                          (product) => {
                            return {
                              product: product._id,
                              cart: product.cart,
                            };
                          }
                        );
                        const userId = currentUser._id;
                        dispatch(actAddCartAsync(userId, totalCart)).then(
                          (result) => {
                            if (result.success) {
                              messageApi
                                .success("Chúc mừng chốt hàng thành công!")
                                .then(() => {
                                  navigate("/cartCheck", { replace: true });
                                  dispatch(actResetCart());
                                });
                            }
                          }
                        );
                      }}
                    >
                      Đặt hàng
                    </Button>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
            dataSource={updatedProductsToBuy}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
}
