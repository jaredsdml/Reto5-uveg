import { Service, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie, MovieDetail, MovieListResponse } from './movie.model';

@Service()
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${environment.tmdbToken}`,
    });
  }

  getTopRated(): Observable<Movie[]> {
    return this.http
      .get<MovieListResponse>(`${this.apiUrl}/movie/top_rated?language=es-MX&page=1`, {
        headers: this.headers,
      })
      .pipe(map((respuesta) => respuesta.results));
  }

  getMovieDetails(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}?language=es-MX`, {
      headers: this.headers,
    });
  }
}