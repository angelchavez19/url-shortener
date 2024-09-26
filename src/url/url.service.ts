import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUrlDTO } from './dto/create-url.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UrlService {
  chars: string = 'abcdefghijklmnopqrstuvwxyz';

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

  async getUrls() {
    return await this.prisma.url.findMany();
  }

  async _deleteURLs() {
    await this.prisma.url.deleteMany({
      where: { expiresAt: { lte: new Date() } },
    });
  }

  async _createURL(url: string) {
    let loopCounter = 0;

    while (true) {
      const shortened = this._getShortened(6);
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
}
