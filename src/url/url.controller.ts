import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private service: UrlService) {}

  @Get(':short_url')
  async redirectToOriginalURL(
    @Res() res: Response,
    @Param() url: { short_url: string },
  ) {
    return this.service.redirectToOriginalURL(res, url.short_url);
  }

  @Post('api/url')
  async createUrl(@Body() url: CreateUrlDTO) {
    return this.service.createURL(url);
  }
}
