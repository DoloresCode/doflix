import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
// import { Movie } from '../../types/movie';
import { MoviesDto } from '../../types/movie';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.scss'
})
export class ShowsListComponent implements OnInit {

  showsList$: Observable<MoviesDto> | null = null;
  searchValue = '';
  showsType: 'movie' | 'tv' = 'movie';

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.showsType =this.route.snapshot.params['type'];
    this.getPagedShows(1);
  }

  getPagedShows(page: number, searchKeyword?: string) {
    this.showsList$ = this.moviesService.searchMovies(page, searchKeyword);
  }

  searchChanged() {
    this.getPagedShows(1, this.searchValue);
  }
  pageChanged(event: PaginatorState) {
    const pageNumber = event.page ? event.page + 1 : 1;
      this.getPagedShows(pageNumber, this.searchValue);
  }
}
