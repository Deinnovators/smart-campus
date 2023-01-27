import { Injectable } from '@nestjs/common';
import { appRunningStatus } from '@api/app.constant';
@Injectable()
export class AppService {
  getHello(): string {
    return appRunningStatus;
  }
}
