import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MovieListContext } from '../App';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

let baseUrlImages = 'https://image.tmdb.org/t/p/w92'; // w92, w154, w185, w342, w500, w780

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatedMovieList, setUpdatedMovieList] = useState([]);
  const movieList = useContext(MovieListContext);
  
  useEffect(() => {
    let list = movieList;
    if (searchTerm) {
      list = movieList.filter(movie => {
        const title = movie.title.toLowerCase();
        return title.includes(searchTerm);
      });  
    } else {
      list = movieList;
    }
    setUpdatedMovieList(list);
  }, [searchTerm, movieList]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
          <div className="container">
        <h1 id='page-header'>Most Popular Movies</h1>
        <div id='search-div'>
            <input 
                type='text' 
                id='search' 
                placeholder='Search...' 
                value={searchTerm} 
                onChange={handleSearch} 
            />
        </div>
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody className='item'>
        {updatedMovieList.map((item, index) => (
              <tr key={item.id} index={index}>
                <td className='rank'>{index+1}</td>
                <td className='poster'>
                    <img 
                        src={`${baseUrlImages}${item.poster_path}`} 
                        alt={item.title}
                    />  
                </td>
                <td className='title'><NavLink to={`/${item.id}`}>{item.title}</NavLink></td>
                <td className='year'>{item.release_date.slice(0, 4)}</td>
                <td className='rating'>{item.vote_average}</td>
              </tr>
        ))}
        </tbody>
        </Table>
        </div>
        </div>
    );
};

export default Home;