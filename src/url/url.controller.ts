import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private service: UrlService) {}

  @Get()
  index() {
    return this.service._getStaticFileResponse('index.html', 'text/html');
  }

  @Get('favicon.svg')
  favicon() {
    return this.service._getStaticFileResponse('favicon.svg', 'image/svg+xml');
  }

  @Get(':short_url')
  redirectToOriginalURL(
    @Res() res: Response,
    @Param() url: { short_url: string },
  ) {
    return this.service.redirectToOriginalURL(res, url.short_url);
  }

  @Get('api/urls')
  getAllURLs() {
    return this.service.getURLs();
  }

  @Post('api/url')
  createUrl(@Body() url: CreateUrlDTO) {
    return this.service.createURL(url);
  }
}
