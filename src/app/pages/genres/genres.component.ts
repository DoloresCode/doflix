import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Genre, Movie } from '../../types/movie';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<Movie[]> | null = null;
  genreId = '';
  currentPage = 1; // Add this line to keep track of the current page

  constructor(private mService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.shows$ = this.mService.getMoviesByGenre(this.genreId, this.currentPage);
    });
    this.genres$ = this.mService.getMoviesGenres();
  }

  findByGenre(genreId: string) {
    // this.shows$ = this.mService.getMoviesByGenre(genreId);
  }

  pageChanged(event: PaginatorState) {
    const newPage = event.page ? event.page + 1 : 1;
    this.currentPage = newPage;
    this.shows$ = this.mService.getMoviesByGenre(this.genreId, this.currentPage);
  }
}