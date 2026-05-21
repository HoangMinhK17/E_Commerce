import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryproductDto {
  @IsString()
  @IsNotEmpty({ message: 'Name không được để trống' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug!: string;

  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  isStatus?: string;
}
