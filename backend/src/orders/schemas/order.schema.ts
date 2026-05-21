import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';
import { min } from 'class-validator/types/decorator/number/Min';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ _id: false })
class OrderItem {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Product' })
    productId!: Types.ObjectId | Product;

    @Prop({ required: true })
    productName!: string;

    @Prop({ required: true })
    size!: string;

    @Prop({ required: true })
    quantity!: number;

    @Prop({ required: true, min: 0 })
    priceAtPurchase!: number;

    @Prop({ required: true, min: 0 })
    costAtPurchase!: number;

}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    user!: Types.ObjectId | User;

    @Prop({ required: true, type: [OrderItemSchema] })
    items!: OrderItem[];

    @Prop({ required: true, min: 0 })
    subTotal!: number;

    @Prop({ default: 0, min: 0 })
    discountAmount!: number;

    @Prop({ default: 0, min: 0 })
    shippingFee!: number;

    @Prop({ required: true, min: 0 })
    totalPayment!: number;

    @Prop({ default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
    status!: string;

    @Prop({ default: 'COD' , enum: ['COD', 'CreditCard', 'QRCode', 'BankTransfer'] })
    paymentType!: string;

    @Prop({ default: false })
    isPaid!: boolean;

    @Prop({ required: true })
    shippingAddress!: string;

    @Prop({ required: true })
    phoneNumber!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ default: '' })
    notes!: string;

}
const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema, OrderItemSchema };
