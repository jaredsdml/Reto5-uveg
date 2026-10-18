import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe obtener las películas mejor valoradas', () => {
    let resultado: any[] = [];
    service.getTopRated().subscribe((movies) => (resultado = movies));

    const req = httpMock.expectOne((r) => r.url.includes('/movie/top_rated'));
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    req.flush({ page: 1, results: [{ id: 1, title: 'Película 1' }] });

    expect(resultado.length).toBe(1);
    expect(resultado[0].title).toBe('Película 1');
  });

  it('debe obtener el detalle de una película', () => {
    let resultado: any;
    service.getMovieDetails(278).subscribe((movie) => (resultado = movie));

    const req = httpMock.expectOne((r) => r.url.includes('/movie/278'));
    expect(req.request.method).toBe('GET');
    req.flush({ id: 278, title: 'Detalle' });

    expect(resultado.id).toBe(278);
  });
});