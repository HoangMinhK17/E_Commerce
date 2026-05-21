import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ _id: false })
class CartItem {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
    productId!: Types.ObjectId | Product;

    @Prop({ required: true })
    size!: string;

    @Prop({ required: true, min: 1, default: 1 })
    quantity!: number;
}

const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ _id: false })
export class Cart {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId!: Types.ObjectId | User;

    @Prop({ required: true, type: [CartItemSchema] })
    items!: CartItem[];
}

const CartSchema = SchemaFactory.createForClass(Cart);

export { CartSchema };  

