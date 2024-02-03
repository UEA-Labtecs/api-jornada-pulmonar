import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  getConnection() {
    console.log('CONNECTED');
  }
}
