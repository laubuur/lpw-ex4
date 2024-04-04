import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {

  service = inject(MovieService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  id?: number | 'new';


  form = this.fb.group({
    title: ["", Validators.required],
    year: ["", [Validators.required, Validators.min(1896)]],
    director: ["", Validators.required],
    synopsis: ["", [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (!this.id) return;

    if (this.id !== 'new') {
      this.getMovie(this.id);
    }

  }

  private getMovie(id: number) {
    this.service.get(id).subscribe(res => {
      if (res.data) {
        this.form.disable();
        this.form.controls.title.setValue(res.data.title);
        this.form.controls.year.setValue(res.data.year + '');
        this.form.controls.director.setValue(res.data.director);
        this.form.controls.synopsis.setValue(res.data.synopsis);
      }
    })
  }

  save() {
    const { title, year, director, synopsis } = this.form.controls;
    if (!title.value || !year.value || !director.value || !synopsis.value) return;

    const data: Movie = {
      title: title.value,
      year: +year.value,
      director: director.value,
      synopsis: synopsis.value,
    };
    
    if (this.id === 'new') {
      this.add(data);
    }
    else if (this.id) {
      data.id = +this.id;
      this.update(data);
    }
  }

  private add(data: Movie) {
    this.service.add(data).subscribe(res => {
      this.router.navigateByUrl('/movies');
    });
  }

  private update(data: Movie) {
    this.service.update(data).subscribe(res => {
      this.router.navigateByUrl('/movies');
    });
  }
  
}
