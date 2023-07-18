import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDeleteProductAsync,
  actFetchAllProductsAsync,
} from "../../../store/admin/product/action";
import { Table, Image, Space, Button, Popconfirm, message, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ProductNewDrawer from "./ProductNewDrawer";
import ProductEditModal from "./ProductEditModal";
import { useRef } from "react";
import Highlighter from "react-highlight-words";

export default function Product() {
  const { categoriesByName } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.Product.products);
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    dispatch(actFetchAllProductsAsync());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (recordOne, recordTwo) => {
        return recordOne.id > recordTwo.id;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (recordOne, recordTwo) => {
        return recordOne.name.localeCompare(recordTwo.name);
      },
      filterDropdown: ({
        selectedKeys,
        setSelectedKeys,
        close,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 10 }}>
            <Input
              ref={searchInput}
              value={selectedKeys[0]}
              onChange={(event) => {
                setSelectedKeys(event.target.value ? [event.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
                setSearchText(selectedKeys[0]);
              }}
            />

            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                }}
              >
                Search
              </Button>
              <Button
                style={{ borderColor: "green", color: "green" }}
                onClick={() => {
                  clearFilters();
                  setSearchText("");
                  setSelectedKeys([]);
                  confirm({ closeDropdown: false });
                }}
              >
                Reset
              </Button>
              <Button type="primary" danger onClick={() => close()}>
                Close
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined style={{ fontSize: 20, marginLeft: 5 }} />;
      },
      onFilterDropdownOpenChange: (open) => {
        open && setTimeout(() => searchInput.current?.focus(), 100);
      },
      onFilter: (value, record) => {
        return record.name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
      render: (text) => {
        return (
          <Highlighter
            highlightStyle={{
              backgroundColor: "yellow",
            }}
            autoEscape
            searchWords={[searchText]}
            textToHighlight={text ? text.toString() : ""}
          />
        );
      },
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
      title: "Category",
      dataIndex: "category",
      filters:
        categoriesByName &&
        categoriesByName.map((category) => {
          return {
            text: category,
            value: category,
          };
        }),
      onFilter: (category, record) => {
        return category === record.category;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "statusBoolean",
      filters: [
        { text: "Acitve", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (statusBoolean, record) => {
        return statusBoolean === record.statusBoolean;
      },
      render: (statusBoolean) => {
        return statusBoolean ? "Active" : "Inactive";
      },
    },
    {
      title: "Edit",
      render: (record) => {
        return (
          <EditOutlined
            style={{ fontSize: 25, color: "green" }}
            onClick={() => {
              setOpenEditModal(true);
              setEditProduct(record);
            }}
          />
        );
      },
    },
    {
      title: "Delete",
      render: (record) => {
        return (
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => dispatch(actDeleteProductAsync(record.key))}
          >
            <DeleteOutlined style={{ fontSize: 25, color: "red" }} />
          </Popconfirm>
        );
      },
    },
  ];

  const formatedColumns = columns.map((column) => {
    const numberOfColumns = 8;

    return {
      ...column,
      align: "center",
      width: `${100 / numberOfColumns}%`,
    };
  });

  const dataSource = productList.map((product, index) => {
    return {
      key: product._id,
      id: index + 1,
      name: product.name,
      statusBoolean: product.statusBoolean,
      category: product.category,
      image : product.image,
      price: product.price.toLocaleString("en-us") + " đ",
    };
  });

  const handleDeleteManyProducts = async (idArray) => {
    await dispatch(actDeleteProductAsync(idArray))
      .then((result) => {
        if (result.success) {
          message.success("Delete many products successfully");
          setSelectedRows([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Delete many, add */}
      <Space
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* delete */}
        <Popconfirm
          title="Are you sure?"
          disabled={selectedRows.length > 1 ? false : true}
          onConfirm={() => handleDeleteManyProducts(selectedRows)}
        >
          <Button
            size="large"
            danger
            disabled={selectedRows.length > 1 ? false : true}
          >
            Delete many
          </Button>
        </Popconfirm>

        {/* add new */}
        <Button
          size="large"
          type="primary"
          onClick={() => setAddNewProduct(true)}
        >
          Add New
        </Button>
      </Space>

      {/* TABLE */}
      <Table
        columns={formatedColumns}
        dataSource={dataSource}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedKeys) => {
            setSelectedRows(selectedKeys);
          },
        }}
        pagination={{
          pageSize: 6,
        }}
        bordered
        size="small"
      />

      {/* Add New Drawer */}
      <ProductNewDrawer
        addNewProduct={addNewProduct}
        setAddNewProduct={setAddNewProduct}
        categoriesByName={categoriesByName}
      />

      {/* Edit product modal */}
      <ProductEditModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        editProduct={editProduct}
        categoriesByName={categoriesByName}
      />
    </>
  );
}
