import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryproductDocument = HydratedDocument<Categoryproduct>;

@Schema({ timestamps: true })
export class Categoryproduct {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  slug!: string;
  @Prop({ default: false })
  isDeleted!: boolean;
  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  isStatus!: string;
}
 const CategoryproductSchema = SchemaFactory.createForClass(Categoryproduct);

  CategoryproductSchema.index(
    { slug: 1 }, 
    { 
      unique: true, 
      partialFilterExpression: { isDeleted: false } 
    }
  );

export { CategoryproductSchema };
