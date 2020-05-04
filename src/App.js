import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import MovieInfo from './pages/MovieInfo';
import Home from './pages/Home';
import './App.css';

export const MovieListContext = createContext([]); // MovieListContext.Provider, MovieListContext.Consumer

const baseUrl = 'http://localhost:5000';

function App() {
  const [movieList, setMovieList] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    let list = await axios.get(baseUrl);
    list = list.data;
    list = list.results;
    // remove any movie without votes bc they do not have a cast list or a similar movies list
    list = list.filter(movie => movie.vote_average > 0);
    setMovieList(list);
  };
  
  return (
    <Router>  
      <header>
        <h1 id='logo'>DMDB</h1>
      </header>
      <MovieListContext.Provider value={movieList}>
    <div className="App">
          <Switch>
            <Route
              className='details'
              path={'/'}
              exact
              component={Home}
            />
            <Route
              className='details'
              path={'/:id'}
              exact
              component={MovieInfo}
            />
          </Switch>
    </div>
    </MovieListContext.Provider>
    </Router>
  );
};

export default App;