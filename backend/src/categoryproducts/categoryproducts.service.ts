import { Injectable } from '@nestjs/common';
import { CreateCategoryproductDto } from './dto/create-categoryproduct.dto';
import { UpdateCategoryproductDto } from './dto/update-categoryproduct.dto';
import { Categoryproduct } from './schemas/categoryproduct.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryproductsService {
  constructor(
    @InjectModel(Categoryproduct.name)
    private readonly categoryproductModel: Model<Categoryproduct>,
  ) { }

  create(createCategoryproductDto: CreateCategoryproductDto) {
    const createdCategoryproduct = new this.categoryproductModel(
      createCategoryproductDto,
    );
    return createdCategoryproduct.save();
  }

  findAll() {
    return this.categoryproductModel.find({ isDeleted: false, isStatus: 'active'}).exec();
  }

  findOne(id: string) {
    return this.categoryproductModel.findById(id).exec();
  }

  update(id: string, updateCategoryproductDto: UpdateCategoryproductDto) {
    return this.categoryproductModel
      .findByIdAndUpdate(id, updateCategoryproductDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.categoryproductModel.findByIdAndDelete(id).exec();
  }
}
