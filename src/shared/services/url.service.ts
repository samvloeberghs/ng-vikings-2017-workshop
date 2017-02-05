import { Injectable } from '@angular/core';

@Injectable()
export class URLService {
  open(url: string) {
    window.open(url, '_system');
  }
}
