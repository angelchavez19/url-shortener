import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { PrismaService } from 'src/prisma.service';
import { join } from 'path';
import { Response } from 'express';
import { createReadStream } from 'fs';

@Injectable()
export class UrlService {
  chars: string =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  shortUrlLength = 6;

  constructor(private prisma: PrismaService) {}

  async createURL(url: CreateUrlDTO) {
    await this._deleteURLs(); // TODO: Job scheduler

    const register = await this.prisma.url.findUnique({
      where: { original: url.url },
    });

    if (register) {
      return {
        shortened: register.shortened,
        expires: register.expiresAt,
      };
    }

    const newRegister = await this._createURL(url.url);

    return {
      shortened: newRegister.shortened,
      expires: newRegister.expiresAt,
    };
  }

  async redirectToOriginalURL(res: Response, short_url: string) {
    if (short_url.length !== this.shortUrlLength)
      throw new HttpException('Url not found', HttpStatus.NOT_FOUND);

    const dbUrl = await this.prisma.url.findUnique({
      where: { shortened: short_url },
    });

    if (!dbUrl) throw new HttpException('Url not found', HttpStatus.NOT_FOUND);

    res.redirect(301, dbUrl.original);
  }

  async _deleteURLs() {
    await this.prisma.url.deleteMany({
      where: { expiresAt: { lte: new Date() } },
    });
  }

  async _createURL(url: string) {
    let loopCounter = 0;

    while (true) {
      const shortened = this._getShortened(this.shortUrlLength);
      const expiresAt = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
      );

      try {
        return await this.prisma.url.create({
          data: {
            original: url,
            shortened,
            expiresAt,
          },
        });
      } catch {} // Manage errors

      if (loopCounter > 5)
        throw new HttpException(
          'Failed to create a shortened URL after multiple attempts. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      loopCounter++;
    }
  }

  _getShortened(length: number) {
    let shortened = '';

    for (let i = 0; i < length; i++)
      shortened += this.chars[Math.floor(Math.random() * this.chars.length)];

    return shortened;
  }

  _getStaticFileResponse(filename: string, type?: string) {
    return new StreamableFile(
      createReadStream(join(process.cwd(), 'static', filename)),
      { type },
    );
  }
}
