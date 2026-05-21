import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  findAll() {
    return this.orderModel.find().populate('user', 'name email').populate('items.productId', 'name');
  }

  findOne(id: string) {
    return this.orderModel.findById(id).populate('user', 'name email').populate('items.productId', 'name');
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).populate('user', 'name email').populate('items.productId', 'name');
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
