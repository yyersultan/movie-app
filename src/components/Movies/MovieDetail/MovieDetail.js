
import { UnorderedListOutlined,HeartOutlined,FileAddOutlined,StarOutlined,PlayCircleOutlined } from "@ant-design/icons";
import { Progress,Tooltip,Button } from "antd";
import { useEffect, useState } from "react";
import { withRouter } from "react-router"
import { API_KEY3, instance as axios} from "../../../api/api";
import { Loader } from "../../Loader/Loader";
import styles from './MovieDetail.module.css';
import backdrop from '../../../assets/backdrop.jpg';
import { Crew } from "./Crew";
import { Cast } from "./Cast/Cast";
import { Productions } from "./Productions/Productions";
import { Recommendations } from "./Recommendations/Recommendations";
import { Trailer } from "./Trailer/Trailer";

const img_Back = 'https://image.tmdb.org/t/p/original';
const img_Post = 'https://image.tmdb.org/t/p/w500';

const btn_style =  {
    backgroundColor: '#1f2c55',
    width: '50px',
    height: '50px',
    color: '#fff',
    border: '0',
    marginRight: '25px'
}

 const MovieDetail = (props) => {
     const {id} = props.match.params;
     const[state,setState] = useState({
         movie : {},
         images : {},
         loading : true,
         cast : [],
         crew : [],
         modal : false
     })
     
     useEffect(() => {
         
         const getMovie = async() => {
             try{
                 setState({...state,loading : true});
                const response = await axios.get(`/movie/${id}?api_key=${API_KEY3}`);
                const response2 = await axios.get(`/movie/${id}/images?api_key=${API_KEY3}`);
                const response3 = await axios.get(`/movie/${id}/credits?api_key=${API_KEY3}`);
                // const response4 = await axios.get(`/movie/${id}/videos?api_key=${API_KEY3}`)
                // console.log(response4.data);
                setState({
                    ...state,
                    movie : response.data,
                    images : response2.data,
                    cast : response3.data.cast,
                    crew : response3.data.crew,
                    loading : false
                })
             }catch(e){

             }
             
         }

         getMovie();
         // eslint-disable-next-line
     },[id]);

    const playTrailer = () => {
        setState({...state,modal : !state.modal});
    }
     
     

     if(state.loading){
        return <Loader />
    }
    let posters,backdrops
    if(state.images.posters[0]){
        posters = `${img_Post}${state.images.posters[0].file_path}` 
    }else{
        posters  = backdrop;
    }
    if(state.images.backdrops[0]){
        backdrops = `${img_Back}${state.images.backdrops[0].file_path}`
    }else{
        backdrops =  backdrop;
    }
   

    const {movie} = state
    return (
        <div style = {styles.root}>
            <h3 className = {styles.movieTitle}>Movie Details</h3>
            <div >
                <div style = {{padding :'25px',display:'flex',justifyContent:'center',background: `linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))
                 , url(${backdrops})` ,backgroundSize : 'cover'}}>
                    <div className = {styles.movieInfo}>
                        <img alt='backdrop' src = {posters} className = {styles.movieImg}/>
                        <div className = {styles.movieDetails}>
                            <h1 className = {styles.movieName}>{movie.original_title} ({movie.release_date.split('-')[0]})</h1>

                            <div className = {styles.movieD_genre}>
                                <div>{movie.release_date}(US)</div> 
                                <div className = {styles.genres}>
                                    *
                                    {movie.genres.map((el,i) => {
                                        return <div key = {el.id + '-' + i}>
                                                    {el.name} 
                                                    {i+1 !== movie.genres.length && ','}
                                                </div>
                                    })}
                                </div>
                                <div className = {styles.runTime}>
                                    * {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </div>
                            </div>

                            <div className = {styles.movieRate}>
                                <Progress 
                                    width = {70}
                                    strokeColor = {movie.vote_average >= 70 ? 'green' : '#f0d31e'} 
                                    percent = {movie.vote_average * 10}
                                    format = {(percent) => <div className = {styles.Progress}>{percent}%</div>}
                                    type="circle" 
                                />
                                <div className = {styles.userRate}>
                                    User Score
                                </div>

                                <div className = {styles.btn_Gr}>
                                    <Tooltip title = 'Add to List' placement='bottom'>
                                        <Button 
                                        style = {{...btn_style}}
                                        shape = {'circle'} 
                                        icon = {<UnorderedListOutlined />} />
                                    </Tooltip>
                                    <Tooltip title = 'Mark as Favorite' placement='bottom'>
                                        <Button 
                                        style = {{...btn_style}}
                                        shape = {'circle'} 
                                        icon = { <HeartOutlined />} />
                                    </Tooltip>
                                    <Tooltip title = 'Add to Watchlist' placement='bottom'>
                                        <Button 
                                        style = {{...btn_style}}
                                        shape = {'circle'} 
                                        icon = { <FileAddOutlined />} />
                                    </Tooltip>
                                    <Tooltip title = 'Rate it' placement='bottom'>
                                        <Button 
                                        style = {{...btn_style}}
                                        shape = {'circle'} 
                                        icon = { <StarOutlined />} />
                                    </Tooltip>
                                    <Button type = 'link' onClick = {playTrailer}>
                                        <PlayCircleOutlined size = {100}/> Play Trailer
                                    </Button>
                                    <Trailer 
                                    playTrailer = {playTrailer}
                                    id = {id} 
                                    mode = {state.modal}/>
                                </div>
                            </div>

                            <div className = {styles.overview}>
                                <div>Overview</div>
                                <div className = {styles.description}>
                                     {movie.overview}
                                </div>
                                <div className = {styles.movieCrew}>
                                    {
                                        state.crew.map((el,i) => {
                                            if(i < 6){
                                                return <Crew key ={`${el}!${i}`} name = {el.name} job = {el.job}/>
                                            }
                                            return null
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* MOVIE ACTORS */}
                <Cast cast = {state.cast}/>

                {/*Movie Production companies */}
                <Productions production_companies = {state.movie.production_companies}/>

                {/* RECOMMENDED MOVIES  */}
                <Recommendations id = {id}/>

            </div> 
        </div>
    )
}

const MovieWithRouter = withRouter(MovieDetail);
export {MovieWithRouter};
