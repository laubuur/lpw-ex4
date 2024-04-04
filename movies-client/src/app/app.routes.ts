import { Routes } from '@angular/router';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailComponent } from './components/movie/movie-detail/movie-detail.component';

export const routes: Routes = [
    {
        path: 'subscribe',
        component: SubscriptionComponent
    },
    {
        path: 'movies',
        component: MovieComponent,
        children: [
            {path: ':id', component: MovieDetailComponent}
        ]
    },
    {
        path: '**',
        redirectTo: 'movies'
    }
];
