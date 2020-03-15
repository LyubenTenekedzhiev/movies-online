export const APIsMovieSection = {
  popularMovies:
    "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&sort_by=popularity.desc&page=1&total_results=10",
  popularSeries: "https://api.themoviedb.org/3/trending/tv/week?api_key=58964eae3ce65098adc94e1a7187c0e6&sort_by=popularity.desc",
  familyMovies:
    "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&with_genres=10751|with_genres=16&certification_country=US&certification.lte=G&sort_by=popularity.desc",
  documentaries:
    "https://api.themoviedb.org/3/discover/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&with_genres=99&sort_by=vote_average.desc&vote_count.gte=10"
};

export const APIsSearchMovies = {
  urlSeries:
    "https://api.themoviedb.org/3/search/tv?api_key=58964eae3ce65098adc94e1a7187c0e6&language=en-US&sort_by=popularity.desc&include_adult=false&page=1",
  urlMovies:
    "https://api.themoviedb.org/3/search/movie?api_key=58964eae3ce65098adc94e1a7187c0e6&language=en-US&sort_by=popularity.desc&include_adult=false&page=1"
};
