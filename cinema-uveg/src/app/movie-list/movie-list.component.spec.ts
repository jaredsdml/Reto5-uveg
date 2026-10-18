import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../movie.service';

const peliculas = [
  { id: 1, title: 'Película 1', overview: '', poster_path: null, release_date: '2020-01-01', vote_average: 8.5 },
  { id: 2, title: 'Película 2', overview: '', poster_path: '/a.jpg', release_date: '2021-01-01', vote_average: 8.1 },
];

describe('MovieListComponent', () => {
  function crear(servicio: Partial<MovieService>) {
    TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [{ provide: MovieService, useValue: servicio }],
    });
    const fixture = TestBed.createComponent(MovieListComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar una tarjeta por cada película', () => {
    const fixture = crear({ getTopRated: () => of(peliculas) });
    const tarjetas = fixture.nativeElement.querySelectorAll('.tarjeta');
    expect(tarjetas.length).toBe(2);
    expect(tarjetas[0].textContent).toContain('Película 1');
  });

  it('debe emitir el id al hacer clic en una película', () => {
    const fixture = crear({ getTopRated: () => of(peliculas) });
    let emitido = 0;
    fixture.componentInstance.movieSelected.subscribe((id) => (emitido = id));
    fixture.nativeElement.querySelectorAll('.tarjeta')[1].click();
    expect(emitido).toBe(2);
  });

  it('debe mostrar un mensaje si falla la petición', () => {
    const fixture = crear({ getTopRated: () => throwError(() => new Error('fallo')) });
    expect(fixture.nativeElement.querySelector('.error').textContent).toContain('No se pudieron');
  });
});