import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  create(createCartDto: CreateCartDto) {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }

  findAll() {
        return this.cartModel.find();
  }

  findOne(id: string) {
    return this.cartModel.findById(id);
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
  }

  remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
