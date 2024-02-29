export type Movie = { 
    id: number;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    // name?: string;
    revenue?: number;
    runtime?: string;
    status?: string;
    genres?: Genre[];
    production_countries?: Country[]
}


//  type called MoviesDto that is an object with the following properties find in the API response
export type MoviesDto = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

export type Genre = {
    id: string;
    name: string;
}

export type GenresDto = {
    genres: Genre[];
};

export type Country = {
    iso_3166_1: string;
    name: string;
}