import { Button, Steps } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetClientOrders } from "../../../store/admin/cart/cart.action";
import CartCheckModal from "./CartCheckModal";
import { useNavigate } from "react-router-dom";

export default function CartCheck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.AuthAdmin.currentUser);
  const [openModal, setOpenModal] = useState(false);
  const [order, setOrder] = useState("");
  const ordersByClientId = useSelector(
    (state) => state.CartAdmin.ordersByClientId
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(actGetClientOrders(currentUser._id));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <div className="body-background">
        <div className="container">
          {ordersByClientId.map((order, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: 70,
                }}
              >
                <p style={{ textAlign: "center" }}>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Mã đơn hàng
                  </span>{" "}
                  : {order.cartCode}
                </p>

                <p style={{ textAlign: "center", marginBottom: 30 }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      setOrder(order);
                      setOpenModal(true);
                    }}
                  >
                    Xem giỏ hàng
                  </Button>
                </p>

                <Steps
                  current={order.status}
                  items={[
                    { title: "Waiting" },
                    { title: "Delivery" },
                    { title: "Finished" },
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Modal */}
      <CartCheckModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        order={order}
      />
      ;
    </>
  );
}
