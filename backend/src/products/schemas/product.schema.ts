import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Categoryproduct } from '../../categoryproducts/schemas/categoryproduct.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false }) 
class ProductType {
  @Prop({ required: true })
  size!: string;

  @Prop({ required: true, min: 0 })
  quantity!: number;

  @Prop({ required: true, min: 0 })
  salePrice!: number;

  @Prop({ required: true, min: 0 })
  costPrice!: number;
}
const ProductTypeSchema = SchemaFactory.createForClass(ProductType);

@Schema({ timestamps: true })

export class Product {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    slug!: string;


    @Prop({ required: true })
    description!: string;

    @Prop({ required: true, type: [String] })
    image!: string[];

    @Prop({ required: true , type: [ProductTypeSchema] })
    type!: ProductType[];
        
    @Prop({ required: true , type: Types.ObjectId, ref: 'Categoryproduct' })
    category!: Types.ObjectId | Categoryproduct;

    @Prop({ default: false })
    isDeleted!: boolean;

    @Prop({ default: 'active', enum: ['active', 'inactive'] })
    isStatus!: string;
}
const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index(
  { slug: 1 }, 
  { 
    unique: true, 
    partialFilterExpression: { isDeleted: false } 
  }
);

export { ProductSchema };