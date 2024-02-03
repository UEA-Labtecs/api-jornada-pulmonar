import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, isArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => {
    return value.toUpperCase()
  })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
