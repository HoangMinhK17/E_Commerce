import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateVoucherDto {
    @IsNotEmpty({ message: 'Code không được để trống' })
    code!: string;

    @IsNotEmpty({ message: 'Type không được để trống' })
    type!: string;

    @IsNotEmpty({ message: 'Value không được để trống' })
    @Min(0, { message: 'Value phải lớn hơn hoặc bằng 0' })
    value!: number;

    @IsNotEmpty({ message: 'MaxUses không được để trống' })
    @Min(0, { message: 'MaxUses phải lớn hơn hoặc bằng 0' })
    maxUses!: number;

    @Min(0, { message: 'UsedCount phải lớn hơn hoặc bằng 0' })
    usedCount!: number;

    @IsNotEmpty({ message: 'StartDate không được để trống' })
    startDate!: Date;

    @IsNotEmpty({ message: 'EndDate không được để trống' })
    endDate!: Date;

    @IsOptional()
    isActive!: boolean;

}
