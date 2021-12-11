import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { API_KEY3, instance as axios } from "../../../../api/api";
import styles from './Recommendation.module.css';

export const Recommendations = ({id}) => {
    const[state,setState] = useState([]);
    useEffect(() => {
        const getRecommendations = async() => {
            const response = await axios.get(`/movie/${id}/recommendations?api_key=${API_KEY3}`);
            console.log(response.data.results);
            setState(response.data.results);
        }
        getRecommendations();
    },[id]);
    return (
        <div className = {styles.Recommendations}>
            <h2>Recommendations list</h2>
            <div className = {styles.RecList}>
                {
                    state.map((el,i) => {
                        return <MovieItem key = {i + '[' + el.id} movie = {el}/>
                    })
                }
            </div>
        </div>
    )
}

const MovieItem = ({movie}) =>{
    const rate = Math.round(movie.vote_average * 10);
    let movieName = movie.title;
    if(movieName.length > 22){
        movieName = movieName.slice(0,22) + '...';
    }
    return (
        <NavLink exact to = {`/movie/${movie.id}`}>
            <img alt='movie' src = {'https://image.tmdb.org/t/p/w200' + movie.backdrop_path}/>
            <div className = {styles.recMovieName}>
                <h3>{movieName}</h3>
                <h3>{rate}%</h3>
            </div>
        </NavLink>
    )
}