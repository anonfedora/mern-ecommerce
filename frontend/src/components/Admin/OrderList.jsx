import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import {
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
} from "../../constants/orderConstants";
import { useEffect } from "react";

const OrderList = () => {
  const title = `ALL ORDERS`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_SUCCESS });
    }
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { filed: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      filed: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      filed: "ItemsQty",
      headerName: "Items Qty",
      minWidth: 150,
      type: "number",
      flex: 0.4,
    },
    {
      filed: "amount",
      headerName: "Amount",
      minWidth: 270,
      type: "number",
      flex: 0.5,
    },
    {
      filed: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  return (
    <>
      <MetaData title={`${title} - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">{title}</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
