import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Response } from '../models/response';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends AbstractService {

  list() {
    return this.http.get<Response<Movie[]>>(`${this.baseUri}movie`);
  }

  get(id: number) {
    return this.http.get<Response<Movie>>(`${this.baseUri}movie/${id}`);
  }

  add(data: Movie) {
    return this.http.post<Response<Movie>>(`${this.baseUri}movie`, data);
  }

  update(data: Movie) {
    return this.http.put<Response<Movie>>(`${this.baseUri}movie`, data);
  }

  delete(id: number) {
    return this.http.delete<any>(`${this.baseUri}movie/${id}`);
  }

}
