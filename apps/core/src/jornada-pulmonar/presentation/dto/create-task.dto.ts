import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => {
    return value.toUpperCase();
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
