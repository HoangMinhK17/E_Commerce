import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password!: string;

  @IsOptional()
  @IsEnum(['user', 'admin', 'staff'], { message: 'Role không hợp lệ' })
  role?: string;

  @IsString()
  @IsNotEmpty({ message: 'Email không được để trống' })
  email!: string;

  @IsOptional()
  isDeleted?: boolean;

  @IsOptional()
  isStatus?: string;
}
