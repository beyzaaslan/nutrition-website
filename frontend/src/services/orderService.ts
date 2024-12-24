import { apiRequest } from "./apiHelper";
import { Order } from "../types/Order";
import { OrderItem } from "../types/OrderItem";

export const createOrder = async (orderData: Partial<Order>) => {
  const response = await apiRequest<Partial<Order>>(
    "POST",
    "/order",
    orderData
  );
  return response.data;
};

export const createOrderItem = async (orderItemData: Partial<OrderItem>) => {
  const response = await apiRequest<Partial<OrderItem>>(
    "POST",
    "/orderItem",
    orderItemData
  );
  return response.data;
};

export const getOrders = async () => {
  const response = await apiRequest<Order[]>("GET", "/order");
  return response.data;
};
