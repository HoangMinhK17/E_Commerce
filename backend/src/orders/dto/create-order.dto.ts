import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

class OrderItemDto {
    @IsString()
    @IsNotEmpty({ message: 'ProductId không được để trống' })
    productId!: string;

    @IsString()
    @IsNotEmpty({ message: 'ProductName không được để trống' })
    productName!: string;

    @IsString()
    @IsNotEmpty({ message: 'Size không được để trống' })
    size!: string;

    @IsNumber()
    @Min(1, { message: 'Quantity phải lớn hơn hoặc bằng 1' })
    @IsNotEmpty({ message: 'Quantity không được để trống' })
    quantity!: number;

    @IsNumber()
    @Min(0, { message: 'PriceAtPurchase phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'PriceAtPurchase không được để trống' })
    priceAtPurchase!: number;

    @IsNumber()
    @Min(0, { message: 'CostAtPurchase phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'CostAtPurchase không được để trống' })
    costAtPurchase!: number;

}

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty({ message: 'UserId không được để trống' })
    userId!: string;

    @IsArray({ message: 'Items phải là một mảng' })
    @ValidateNested({ each: true, message: 'Mỗi phần tử trong Items phải là một đối tượng hợp lệ' })
    @Type(() => OrderItemDto)
    @IsNotEmpty({ message: 'Items không được để trống' })
    items!: OrderItemDto[];

    @IsNumber()
    @Min(0, { message: 'SubTotal phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'SubTotal không được để trống' })
    subTotal!: number;

    @IsNumber()
    @Min(0, { message: 'DiscountAmount phải lớn hơn hoặc bằng 0' })
    discountAmount!: number;

    @IsNumber()
    @Min(0, { message: 'ShippingFee phải lớn hơn hoặc bằng 0' })
    shippingFee!: number;

    @IsNumber()
    @Min(0, { message: 'TotalPayment phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'TotalPayment không được để trống' })
    totalPayment!: number;

    @IsString()
    @IsNotEmpty({ message: 'ShippingAddress không được để trống' })
    shippingAddress!: string;

    @IsString()
    @IsNotEmpty({ message: 'PhoneNumber không được để trống' })
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty({ message: 'Email không được để trống' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'Notes không được để trống' })
    notes!: string;

    @IsString()
    @IsNotEmpty({ message: 'Status không được để trống' })
    status!: string;

    @IsOptional()
    paymentType!: string;

    @IsOptional()
    isPaid!: boolean;

}
