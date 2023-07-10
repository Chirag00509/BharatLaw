import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { enc, HmacSHA256 } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  generateTemporaryToken(username : string) {
    const secretKey  = 'cklndFscji12334%$xjkbhdc$CC@@';
    const userId = uuidv4();

    const payload = {
      userId: userId,
      username: username
    };

    const signature = HmacSHA256(JSON.stringify(payload), secretKey).toString(enc.Base64);

    const token = `${userId}.${signature}`;

    return token;
  }
}
