import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie} from '../../types/movie';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Video } from '../../types/video';
import { Image } from '../../types/image';
import { Actor } from '../../types/credits';


@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
})
export class ShowDetailComponent implements OnInit {

  showId = '';
  showType: 'tv' | 'movie' = 'movie';

  show$: Observable<Movie> | null = null;
  showVideos$ : Observable<Video[]> | null = null;
  showImages$ : Observable<Image[]> | null = null;
  showCast$ : Observable<Actor[]> | null = null;
  similarMovies$: Observable<Movie[]> | null = null;

  imagesSizes = IMAGES_SIZES;

  constructor(
    private router: ActivatedRoute, 
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService,
    ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.showId = params['id']
      this.showType = this.router.snapshot.params['type'];

      // other option
      // this.showId = this.router.snapshot.params['id'];

      this.show$ = this.moviesService.getMovieById(this.showId);
      this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
      this.showImages$ = this.moviesService.getMovieImages(this.showId);
      this.showCast$ = this.moviesService.getMovieCast(this.showId);
      this.similarMovies$ = this.moviesService.getMovieSimilar(this.showId);
    });
  }
}
