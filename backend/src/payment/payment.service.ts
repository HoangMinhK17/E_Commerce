import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    const createdPayment = new this.paymentModel(createPaymentDto);
    return createdPayment.save();
  }


  findAll() {
    return this.paymentModel.find();
  }

  findOne(id: string) {
    return this.paymentModel.findById(id);
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, { new: true });
  }

  remove(id: string) {
    return this.paymentModel.findByIdAndDelete(id);
  }
}
