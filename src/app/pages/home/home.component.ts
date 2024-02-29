import { Component } from '@angular/core';
import { map } from 'rxjs/operators'; 
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service'; 
import { mapToMovies } from '../../types/tvshow'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  popularMovies$ = this.moviesService.getPopularMovies(12);
  upcomingMovies$ = this.moviesService.getUpcomingMovies(12);
  topRatedMovies$ = this.moviesService.getTopRatedMovies(12);
  popularTvShows$ = this.tvshowsService.getPopularTvShows(12).pipe(map(mapToMovies) 
  );

  constructor(
    private moviesService: MoviesService, 
    private tvshowsService: TvshowsService) {}

}
