import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GenresDto, MoviesDto } from '../types/movie';
import { map } from 'rxjs';
import { Movie } from '../types/movie';
import { VideosDto } from '../types/video';
import { ImagesDto } from '../types/image'; 
import { CreditsDto } from '../types/credits';

@Injectable()

export class MoviesService {

  constructor(private http: HttpClient) {}

  
  getPopularMovies(count: number = 12) {
    return this.http.get<MoviesDto>(`${environment.apiUrl}${environment.apiKey}`).pipe(map((data)=>data.results.slice(0, count)));
  }

  getUpcomingMovies(count: number = 12) {
    return this.http.get<MoviesDto>(
      `${environment.apiUrlUpcomingMovies}${environment.apiKey}`
    ).pipe(map((data)=>data.results.slice(0, count)));
  }

  getTopRatedMovies(count: number = 12) {
    return this.http.get<MoviesDto>(
      `${environment.apiUrlTopRatedMovies}${environment.apiKey}`
    ).pipe(map((data)=>data.results.slice(0, count)));
  }

  getMovieById (id: string) {
    return this.http.get<Movie> (
      `${environment.apiUrlMovieId}/movie/${id}?api_key=${environment.apiKey}`
    );
  }

  getMovieVideos(id: string) {
    return this.http
      .get<VideosDto>(
        `${environment.apiUrlGeneral}/movie/${id}/videos?api_key=${environment.apiKey}`
      )
      .pipe(map((data) => data.results));
  }

  getMovieImages(id: string) {
    return this.http
      .get<ImagesDto>(
        `${environment.apiUrlGeneral}/movie/${id}/images?api_key=${environment.apiKey}`
      )
      .pipe(map((data) => data.backdrops));
  }

  getMovieCast(id: string) {
    return this.http
      .get<CreditsDto>(
        `${environment.apiUrlGeneral}/movie/${id}/credits?api_key=${environment.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }


  getMovieSimilar(id: string) {
    return this.http
      .get<MoviesDto>(
        `${environment.apiUrlGeneral}/movie/${id}/similar?api_key=${environment.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, 12)));
      }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/popular';
    return this.http.get<MoviesDto>(
      `${environment.apiUrlGeneral}/${uri}?query=${searchValue}&page=${page}&api_key=${environment.apiKey}`
    )
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDto>(`${environment.apiUrlGeneral}/genre/movie/list?api_key=${environment.apiKey}`)
      .pipe(map((data) => data.genres));
  }

  getMoviesByGenre(genreId: string, pageNumber = 1) {
    return this.http
      .get<MoviesDto>(
        `${environment.apiUrlGeneral}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${environment.apiKey}`
      )
      .pipe(
        map((data) => {
          return data.results;
        })
      );
  }

}
