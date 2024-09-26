import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDTO {
  @IsString()
  @IsUrl()
  url: string;
}
