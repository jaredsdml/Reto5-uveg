import { Component, effect, inject, input, output, signal } from '@angular/core';
import { MovieService } from '../movie.service';
import { MovieDetail } from '../movie.model';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.component.css',
  templateUrl: './movie-detail.component.html',
})
export class MovieDetailComponent {
  private movieService = inject(MovieService);

  movieId = input.required<number>();
  closed = output<void>();

  movie = signal<MovieDetail | null>(null);
  error = signal('');

  constructor() {
    effect(() => {
      const id = this.movieId();
      this.error.set('');
      this.movieService.getMovieDetails(id).subscribe({
        next: (movie) => this.movie.set(movie),
        error: () => this.error.set('No se pudo cargar el detalle.'),
      });
    });
  }

  close() {
    this.closed.emit();
  }
}