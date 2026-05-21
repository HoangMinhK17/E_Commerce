import { Module } from '@nestjs/common';
import { CategoryproductsService } from './categoryproducts.service';
import { CategoryproductsController } from './categoryproducts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Categoryproduct,
  CategoryproductSchema,
} from './schemas/categoryproduct.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoryproduct.name, schema: CategoryproductSchema },
    ]),
  ],
  controllers: [CategoryproductsController],
  providers: [CategoryproductsService],
})
export class CategoryproductsModule {}
