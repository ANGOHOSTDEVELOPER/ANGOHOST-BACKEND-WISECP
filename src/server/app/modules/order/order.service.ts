import { CreateOrderDtoType } from "./dtos/createOrder.dto";
import { OrderRepository } from "./order.repository";

export class OrderService {
  private readonly orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(data: CreateOrderDtoType) {
    const { period, period_time } = data;
    const duedate = new Date();

    if (period === "year") {
      duedate.setFullYear(duedate.getFullYear() + period_time);
    } else if (period === "month") {
      duedate.setMonth(duedate.getMonth() + period_time);
    }

    return this.orderRepository.createOrder({
      ...data,
      duedate: duedate.toISOString(),
      suspend_date: new Date(0).toISOString(),
      cdate: duedate.toISOString(),
      cancel_date: new Date(0).toISOString(),
    });
  }

  async getOrderById(id: string) {
    return await this.orderRepository.getOrderById(parseInt(id))
  }
}
