import { useEffect, useState } from "react";
import { withRouter } from "react-router"
import { API_KEY3, instance as axios} from "../../../api/api";
import { Loader } from "../../Loader/Loader";
import { PersonBio } from "./PersonBio";
import styles from './PersonDetail.module.css';
import { PersonInfo } from "./PersonInfo";

const PersonDetail = (props) => {
    const {id} = props.match.params;
    const[state,setState] = useState({
        person : {},
        filmList :[],
        loading : true
    })
    useEffect(() =>{
        const getPersonDetails = async() => {
            const response = await axios.get(`/person/${id}?api_key=${API_KEY3}`);
            const response2 = await axios.get(`/person/${id}/movie_credits?api_key=${API_KEY3}`);
            const sortedFilmList =response2.data.cast.sort((a,b) => b.popularity - a.popularity).slice(0,9);
            setState({
                ...state,
                loading : false,
                filmList : sortedFilmList,
                person : response.data
            })
        }
        getPersonDetails();
         // eslint-disable-next-line
    },[]);

    if(state.loading){
        return <Loader />
    }
    return (
        <div className = {styles.PersonDetail}>
            <div className = {styles.PersonDetailContainer}>
                <PersonInfo person = {state.person}/>
                <PersonBio 
                filmList = {state.filmList}
                person = {state.person}/>
            </div>
        </div>
    )
}

const PersonDetailWithRoute = withRouter(PersonDetail);
export {PersonDetailWithRoute};