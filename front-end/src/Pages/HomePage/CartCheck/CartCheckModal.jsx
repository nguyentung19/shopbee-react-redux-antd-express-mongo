import { Image, Modal, Table } from "antd";
import React from "react";

export default function CarCheckModal({ openModal, setOpenModal, order }) {
  let formatOrderCart;

  if (order) {
    formatOrderCart = order.cart.map((item) => {
      return {
        key: item._id,
        ...item,
      };
    });
  }

  return (
    <Modal
      open={openModal}
      title={`Mã đơn hàng :  ${order.cartCode}`}
      onCancel={() => {
        setOpenModal(false);
      }}
      footer={false}
      width="max-content"
      
    >
      <Table
      style={{
        marginTop : 30
      }}
        columns={[
          {
            title: "Name",
            align: "center",
            render: (record) => {
              return record.product.name;
            },
          },
          {
            title: "Image",
            align: "center",
            render: (record) => {
              return (
                <Image
                  src={record.product.image.path}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "contain",
                  }}
                />
              );
            },
          },
          {
            title: "Category",
            align: "center",
            render: (record) => {
              return record.product.category;
            },
          },
          {
            title: "Số lượng",
            dataIndex: "cart",
            align: "center",
          },
          {
            title: "Thành tiền",
            align: "center",
            render: (record) => {
              return (record.cart * record.product.price).toLocaleString();
            },
          },
        ]}
        dataSource={formatOrderCart}
        bordered
        pagination={false}
        summary={(record) => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={4} align="right">
                <span
                  style={{
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  Total
                </span>
              </Table.Summary.Cell>
              <Table.Summary.Cell align="center">
                <span style={{ fontSize: 20, fontWeight: "bold" }}>
                  {record
                    .reduce((total, item) => {
                      return (total += item.cart * item.product.price);
                    }, 0)
                    .toLocaleString()}
                </span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </Modal>
  );
}
