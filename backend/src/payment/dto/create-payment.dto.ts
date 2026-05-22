import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';


export class CreatePaymentDto {
    @IsNotEmpty({ message: 'OrderId không được để trống' })
    orderId!: Types.ObjectId;

    @IsString()
    @IsNotEmpty({ message: 'PaymentMethod không được để trống' })
    paymentMethod!: string

    @IsNumber()
    @Min(0, { message: 'Amount phải lớn hơn hoặc bằng 0' })
    @IsNotEmpty({ message: 'Amount không được để trống' })
    amount!: number;  

    @IsOptional()
    status!: string;  

    @IsString()
    transactionId!: string;
    
    @IsString()
    rawResponse!: string;  
}
