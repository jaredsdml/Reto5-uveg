import { Component, OnInit, output, signal, inject } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  imports: [],
  selector: 'app-movie-list',
  styleUrl: './movie-list.component.css',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService);

  movies = signal<Movie[]>([]);
  error = signal('');
  movieSelected = output<number>();

  ngOnInit() {
    this.movieService.getTopRated().subscribe({
      next: (movies) => this.movies.set(movies),
      error: () => this.error.set('No se pudieron cargar las películas.'),
    });
  }

  selectMovie(id: number) {
    this.movieSelected.emit(id);
  }
}