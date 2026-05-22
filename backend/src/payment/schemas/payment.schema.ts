import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Order } from '../../orders/schemas/order.schema';
import { User } from '../../users/schemas/user.schema';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Order' })
    orderId!: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId!: string;

    @Prop({ required: true, enum: ['COD', 'CreditCard', 'QRCode', 'BankTransfer'] })
    paymentMethod!: string;

    @Prop({ required: true, min: 0 })
    amount!: number;

    @Prop({ default: 'pending', enum: ['pending', 'success', 'failed'] })
    status!: string;

    @Prop()
    transactionId?: string;

    @Prop()
    rawResponse?: string;

}

const PaymentSchema = SchemaFactory.createForClass(Payment);

export { PaymentSchema };


