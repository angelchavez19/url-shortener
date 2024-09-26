import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller('api/url')
export class UrlController {
  constructor(private service: UrlService) {}

  @Get()
  async getAllURLs() {
    return this.service.getUrls();
  }

  @Post()
  async createUrl(@Body() url: CreateUrlDTO) {
    return this.service.createURL(url);
  }

  @Delete()
  async deleteURLs() {
    return this.service._deleteURLs();
  }
}
