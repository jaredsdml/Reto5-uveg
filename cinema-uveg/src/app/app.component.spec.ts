import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { MovieService } from './movie.service';

const peliculas = [
  { id: 1, title: 'Película 1', overview: '', poster_path: null, release_date: '2020-01-01', vote_average: 8.5 },
];
const detalle = { ...peliculas[0], tagline: '', runtime: 100, genres: [] };

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: MovieService,
          useValue: { getTopRated: () => of(peliculas), getMovieDetails: () => of(detalle) },
        },
      ],
    });
    window.scrollTo = () => {};
  });

  it('debe mostrar el título y la lista', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Cinema UVEG');
    expect(el.querySelectorAll('.tarjeta').length).toBe(1);
  });

  it('al presionar una película debe mostrar su detalle', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-movie-detail')).toBeNull();

    (el.querySelector('.tarjeta') as HTMLElement).click();
    await fixture.whenStable();
    expect(el.querySelector('app-movie-detail')).not.toBeNull();
    expect(el.querySelector('.detalle')?.textContent).toContain('100 min');
  });
});