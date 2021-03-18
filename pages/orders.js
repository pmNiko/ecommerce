import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";

export default function orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAling: "center" }}>
              Todavia no haz realizado compras.
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList({ orders }) {
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={6} computer={8} key={order._id}>
          <Order {...order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
