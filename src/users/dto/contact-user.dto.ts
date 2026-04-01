import {
  IsIn,
  IsEmail,
  Matches,
  ValidateIf,
  IsString,
} from 'class-validator';

export class ContactDto {

  @IsIn(['phone', 'email'])
  type: string;

  @IsString()
  @ValidateIf(o => o.type === 'phone')
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 digits',
  })
  @ValidateIf(o => o.type === 'email')
  @IsEmail({}, { message: 'Invalid email address' })
  value: string;
}
