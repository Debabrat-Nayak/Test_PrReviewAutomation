import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min, MinLength, ValidateNested } from 'class-validator';
import { ContactDto } from './contact-user.dto';

export class AddressDto {
    @IsOptional()
    @IsString()
    line: string;

    @IsOptional()
    @IsString()
    landmark: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @Matches(/^\d{6}$/, {
        message: 'Pincode must be 6 digits',
    })
    pincode: string;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    age: number;

    @IsOptional()
    @IsIn(['male', 'female', 'others'])
    gender: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContactDto)
    contacts: ContactDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;


}
