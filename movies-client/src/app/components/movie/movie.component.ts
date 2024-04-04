import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Response } from '../../models/response';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit {
  service = inject(MovieService);
  router = inject(Router);
  removeId?: number;
  movies$?: Observable<Response<Movie[]>>;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.url.subscribe(val => {
      if (!this.route.snapshot.children[0]) {
        this.movies$ = this.service.list();
      }
    })
  }

  remove() {
    if (this.removeId) {
      this.service.delete(this.removeId).subscribe((res) => {
        this.removeId = undefined;
        this.movies$ = this.service.list();
      });
    }
   
  }
}
