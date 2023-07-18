import { Image, Popconfirm, Select, Table, message } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteCartAsync,
  actGetCartListAsync,
  actUpdateStatusAsync,
} from "../../../store/admin/cart/cart.action";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

export default function CartAdminPage() {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.CartAdmin);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(actGetCartListAsync());
  }, [dispatch]);

  let cartSource = cartList.map((item, index) => {
    return {
      key: item.cartCode,
      id: index + 1,
      ...item,
      cart: item.cart.map((cartItem, index) => {
        return {
          key: cartItem._id,
          id: index + 1,
          ...cartItem,
        };
      }),
    };
  });

  // Cart Item Column
  const cartItemColumn = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (record) => {
        return record.product.name;
      },
    },
    {
      title: "Image",
      render: (record) => {
        return (
          <Image
            src={record.product.image.path}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        );
      },
    },
    {
      title: "Category",
      render: (record) => {
        return record.product.category;
      },
    },
    {
      title: "Price",
      render: (record) => {
        return record.product.price.toLocaleString();
      },
    },
    {
      title: "Cart",
      dataIndex: "cart",
    },
    {
      title: "Thành tiến",
      render: (_, value) => {
        return (value.product.price * value.cart).toLocaleString();
      },
    },
  ];

  // Format Cart Item
  const formatCartItemColumn = cartItemColumn.map((item) => {
    return {
      ...item,
      align: "center",
    };
  });

  return (
    <>
      {contextHolder}
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            align: "center",
            width: "5%",
          },
          {
            title: "Code",
            dataIndex: "cartCode",
            align: "center",
          },
          {
            title: "Customer",
            dataIndex: "user",
            align: "center",
            width: "25%",
            render: (_, value) => {
              let user = value.user;
              user = {
                Name: user.username,
                Email: user.email,
                Role: user.role,
                Phone: user.phone,
                Address: user.address,
              };
              const renderUser = Object.entries(user).map((item, index) => {
                return (
                  <p key={index} style={{ textAlign: "left" }}>
                    <span style={{ fontWeight: "bolder" }}>{item[0]} : </span>
                    {item[1]}
                  </p>
                );
              });

              return renderUser;
            },
          },
          {
            title: "Tổng bill",
            align: "center",
            render: (record) => {
              return (
                <p>
                  {record.cart
                    .reduce((total, item) => {
                      return (total += item.product.price * item.cart);
                    }, 0)
                    .toLocaleString()}
                </p>
              );
            },
          },
          {
            title: "Status",
            dataIndex: "status",
            align: "center",
            render: (status, record) => {
              return (
                <Select
                  style={{
                    width: 120,
                  }}
                  defaultValue={status}
                  options={[
                    { value: 0, label: "Waiting" },
                    { value: 1, label: "Delivery" },
                    { value: 2, label: "Finished" },
                  ]}
                  onChange={(value) => {
                    dispatch(actUpdateStatusAsync(record._id, value)).then(
                      (result) => {
                        console.log(result);
                        if (result.success) {
                          messageApi.success(
                            "Đã thay đổi trạng thái thành công"
                          );
                        }
                      }
                    );
                  }}
                />
              );
            },
          },
          {
            title: "Date",
            dataIndex: "createdAt",
            align: "center",
            render: (record) => {
              return moment(record).format("LLLL");
            },
          },
          {
            title: "Delete",
            align: "center",
            render: (record) => {
              return (
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    dispatch(actDeleteCartAsync(record._id)).then(result => {
                      if(result.success) {
                        messageApi.success("Đã xóa cart thành công")
                      }
                    })
                  }}
                >
                  <DeleteOutlined style={{ fontSize: 25, color: "red" }} />
                </Popconfirm>
              );
            },
          },
        ]}
        dataSource={cartSource}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Table
                columns={formatCartItemColumn}
                dataSource={record.cart}
                pagination={false}
                bordered
              />
            );
          },
        }}
        bordered
        size="small"
      />
    </>
  );
}
