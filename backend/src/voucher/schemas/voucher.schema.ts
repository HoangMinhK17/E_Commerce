import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoucherDocument = HydratedDocument<Voucher>;

@Schema({ timestamps: true })

export class Voucher {

    @Prop({ required: true, unique: true })
    code!: string;

    @Prop({ required: true, enum: ['percentage', 'fixed'] })
    type!: string;

    @Prop({ required: true, min: 0 })
    value!: number;

    @Prop({ required: true, min: 0 })
    maxUses!: number;

    @Prop({ default: 0, min: 0 })
    usedCount!: number;

    @Prop({ required: true })
    startDate!: Date;

    @Prop({ required: true })
    endDate!: Date;

    @Prop({ default: true })
    isActive!: boolean;

}

const VoucherSchema = SchemaFactory.createForClass(Voucher);

export { VoucherSchema };


