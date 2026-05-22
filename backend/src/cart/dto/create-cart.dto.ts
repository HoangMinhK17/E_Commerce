import { IsNotEmpty, Min } from 'class-validator';
import { Types } from 'mongoose';

class CartItemDto {
    @IsNotEmpty({ message: 'ProductId không được để trống' })
    productId!: Types.ObjectId;

    @IsNotEmpty({ message: 'Size không được để trống' })
    size!: string;
    
    @IsNotEmpty({ message: 'Quantity không được để trống' })
    @Min(1, { message: 'Quantity phải lớn hơn hoặc bằng 1' })
    quantity!: number;
}

export class CreateCartDto {
    @IsNotEmpty({ message: 'UserId không được để trống' })
    userId!: Types.ObjectId;
    @IsNotEmpty({ message: 'Items không được để trống' })
    items!: CartItemDto[];
}

