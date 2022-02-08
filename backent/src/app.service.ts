import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      success: true,
      message: 'Hello World!',
    });
  }
}
