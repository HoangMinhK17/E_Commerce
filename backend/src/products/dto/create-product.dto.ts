import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, Min, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

class productTypeDTO {
    @IsString()
    @IsNotEmpty({ message: 'Name không được để trống' })
    size!: string;

    @IsNumber()
    @Min(0, { message: 'SalePrice phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'Price không được để trống' })
    salePrice!: number;

    @IsNumber()
    @Min(0, { message: 'Quantity phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'Quantity không được để trống' })
    quantity!: number;

    @IsNumber()
    @Min(0, { message: 'CostPrice phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'CostPrice không được để trống' })
    costPrice!: number;

}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty({ message: 'Name không được để trống' })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: 'Slug không được để trống' })
    slug!: string;

    @IsString()
    @IsNotEmpty({ message: 'Description không được để trống' })
    description!: string;

    @IsArray({ message: 'Image phải là một mảng' })
    @IsString({ each: true, message: 'Mỗi phần tử trong Image phải là một chuỗi' })
    @IsNotEmpty({ message: 'Image không được để trống' })
    image!: string[];

    @IsArray({ message: 'Type phải là một mảng' })
    @IsNotEmpty({ message: 'Type không được để trống' })
    @Type(() => productTypeDTO)
    @ValidateNested({ each: true, message: 'Mỗi phần tử trong Type phải là một đối tượng hợp lệ' })
    type!: productTypeDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Category không được để trống' })
    category!: string;

    @IsOptional()
    isDeleted?: boolean;

    @IsOptional()
    isStatus?: string;

}
