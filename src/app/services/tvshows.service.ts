import {HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { TvShowsDto } from '../types/tvshow';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  constructor(private http: HttpClient) {}

  getPopularTvShows(count: number = 20) {
    return this.http.get<TvShowsDto>(`${environment.apiUrlTvshowPopular}${environment.apiKey}`).pipe(map((data)=>data.results.slice(0, count)));
  }

  getTvShowId(id: string) {
    return this.http.get<TvShowsDto>(`${environment.apiUrlGeneral}/tv/${id}${environment.apiKey}`);
  }



}
