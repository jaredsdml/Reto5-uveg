import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../movie.service';

const detalle = {
  id: 278,
  title: 'Cadena perpetua',
  overview: 'Resumen',
  poster_path: null,
  release_date: '1994-09-23',
  vote_average: 8.7,
  tagline: 'El miedo te mantiene prisionero',
  runtime: 142,
  genres: [{ id: 18, name: 'Drama' }],
};

describe('MovieDetailComponent', () => {
  function crear() {
    TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [{ provide: MovieService, useValue: { getMovieDetails: () => of(detalle) } }],
    });
    const fixture = TestBed.createComponent(MovieDetailComponent);
    fixture.componentRef.setInput('movieId', 278);
    return fixture;
  }

  it('debe mostrar el detalle de la película', async () => {
    const fixture = crear();
    await fixture.whenStable();
    const texto = fixture.nativeElement.textContent;
    expect(texto).toContain('Cadena perpetua');
    expect(texto).toContain('142 min');
    expect(texto).toContain('Drama');
  });

  it('debe emitir closed al presionar Cerrar', async () => {
    const fixture = crear();
    await fixture.whenStable();
    let cerrado = false;
    fixture.componentInstance.closed.subscribe(() => (cerrado = true));
    fixture.nativeElement.querySelector('button').click();
    expect(cerrado).toBe(true);
  });
});