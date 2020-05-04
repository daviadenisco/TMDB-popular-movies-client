import React, { useContext, useState } from 'react';
import { MovieListContext } from '../App';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/movie';
let baseUrlImages = 'https://image.tmdb.org/t/p/w342'; // w92, w154, w185, w342, w500, w780

function MovieInfo(props) {
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  let id;
  const movieList = useContext(MovieListContext);
  const movie = movieList.find( m => `${m.id}` === props.match.params.id);

  const getMovieInfo = async (id) => {
    let cast = await axios.get(`${baseUrl}/${id}/credits`);
    let similar = await axios.get(`${baseUrl}/${id}/similar`);
      setCast(cast.data.cast);
      setSimilarMovies(similar.data.results);
  };

  if (!movie) {
    return <div> Movie not found.</div>
  } else {
    id = movie.id;
    getMovieInfo(id);
  };

  function dateConverter(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container">
      <div className='poster'>
        <img 
          src={`${baseUrlImages}${movie.poster_path}`} 
          alt={movie.title}
        />
      </div>
      <div className='main-info'>
        <h1>{movie.title}</h1>
        <div><b>Rating: </b>{movie.vote_average}</div>
        <div><b>Release Date: </b>{movie.release_date ? dateConverter(movie.release_date) : ''}</div>
        <p><b>Overview: </b>{movie.overview}</p>
      </div>
      <div className='similar'>
        <h3>Similar Movies</h3>
          {similarMovies.map((movie, index) => (
            <div key={movie.id} index={index}>
              {movie.vote_average > 5 ? 
                <div>
                  {movie.title}, Rating: {movie.vote_average}
                </div> 
                : ''
              }
              </div>
            ))}
      </div>
      <div className='cast'>
        <h3>Top Billed Cast</h3>
          {cast.map((castMember, index) => (
            <div key={castMember.id} index={index}>
              {castMember.profile_path ? 
                <div className='cast-info'>
                  {/* use rel='noopener noreferrer' to mitigate security risk */}
                  <img className='headshots' src={`${baseUrlImages}${castMember.profile_path}`} alt='actor headshot'/>
                    <span>{castMember.name}</span>
                    <span> as {castMember.character}</span>
                </div> : ''}
              </div>
            ))}
      </div>
    </div>
  );
};

export default MovieInfo;