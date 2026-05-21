import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryproductDto } from './create-categoryproduct.dto';

export class UpdateCategoryproductDto extends PartialType(
  CreateCategoryproductDto,
) {}
