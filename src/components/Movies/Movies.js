import { useEffect, useState } from 'react';
import styles from './Movies.module.css';
import {API_KEY3, instance as axios}  from '../../api/api';
import { MovieList } from './MovieList';
import { Sort } from './Filters/Sort';
import { Filters } from './Filters/Filters';
import { Loader } from '../Loader/Loader';
import { Pagination } from 'antd';



const Movies = ({sortBy,changeSort,page,genres,
    onPaginated,year,onYearChange,onGenresChange}) => {

    const[state,setState] = useState([]);
    const[loading,setLoading] = useState(false);

    const getMovieList = async() => {
        try{
            setLoading(true);
            const response = await axios.get(`/discover/movie?api_key=${API_KEY3}&sort_by=${sortBy}&page=${page}&year=${parseInt(year)}&with_genres=${genres.join(',')}`);
            setState(response.data.results);
            setLoading(false);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {  
        getMovieList();
        // eslint-disable-next-line
    },[sortBy,page,year,genres])
    return (
        <>
        <div className = {styles.movies}>
            <div className = {styles.filters}>
                <Sort 
                changeSort = {changeSort}
                sortValue = {sortBy}/>
                <Filters onGenresChange = {onGenresChange} onYearChange = {onYearChange}/>  
                
            </div>
            <div className = {styles.movieList}>           
                <div className = {styles.movie_block}>
                { loading ? <Loader /> :
                    state.map((movie) => {
                        return <MovieList 
                                key = {movie.id}
                                id = {movie.id}
                                name = {movie.original_title}
                                rating = {movie.vote_average}
                                img={movie.backdrop_path}
                                poster_path = {movie.poster_path}
                        />
                    })
                }
                </div>
            </div>
            
        </div>
        <div className = {styles.Pagination}>
            <Pagination 
                onChange = {onPaginated}
                total = {100}
                defaultCurrent = {page}
            />
        </div>
      
        </>
    )
}

export {Movies}