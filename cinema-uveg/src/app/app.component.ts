import { Component, signal } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@Component({
  imports: [MovieListComponent, MovieDetailComponent],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedMovieId = signal<number | null>(null);

  onMovieSelected(id: number) {
    this.selectedMovieId.set(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDetailClosed() {
    this.selectedMovieId.set(null);
  }
}