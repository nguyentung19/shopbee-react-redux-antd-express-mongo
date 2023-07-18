import React, { useState } from "react";
import { ConfigProvider, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actSearchProduct } from "../../../../store/client/productClient/action.productClient";

export default function HeaderSearch() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(actSearchProduct(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "#ed502e",
          borderRadius: 0,
        },
      }}
    >
      <Input.Search
        className="header-search"
        size="large"
        placeholder="Nhập để tìm kiếm sản phẩm"
        onChange={(event) => setQuery(event.target.value)}
      />
    </ConfigProvider>
  );
}
