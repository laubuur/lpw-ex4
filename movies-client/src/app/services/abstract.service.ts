import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class AbstractService {
  http = inject(HttpClient);
  baseUri = 'http://localhost:4501/'
}
