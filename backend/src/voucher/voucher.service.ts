import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voucher, VoucherDocument } from './schemas/voucher.schema';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}

  create(createVoucherDto: CreateVoucherDto) {
    const createdVoucher = new this.voucherModel(createVoucherDto);
    return createdVoucher.save();
  }

  findAll() {
    return this.voucherModel.find();
  }

  findOne(id: string) {
    return this.voucherModel.findById(id);
  }

  update(id: string, updateVoucherDto: UpdateVoucherDto) {
    return this.voucherModel.findByIdAndUpdate(id, updateVoucherDto, { new: true });
  }

  remove(id: string) {
    return this.voucherModel.findByIdAndDelete(id);
  }
}
