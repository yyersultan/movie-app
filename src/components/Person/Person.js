import { useEffect, useState } from 'react';
import { API_KEY3, instance as axios} from '../../api/api';
import styles from './Person.module.css';
import { PersonItem } from './PersonItem';

export const Person = () => {
    const[state,setState] = useState({
        people : [],
        loading : true
    })
    useEffect(() => {
        // GET PEOPLE LIST;
        const getPeopleList = async() => {
            const response = await axios.get(`person/popular?api_key=${API_KEY3}`);
            setState({
                ...state,
                people : response.data.results
            });
        }
        getPeopleList();
         // eslint-disable-next-line
    },[]);

    return(
        <div className = {styles.Person}>
            <h1>Popular People</h1>
            <div className = {styles.PersonList}>
                {
                    state.people.map((el,i) => {
                        return <PersonItem 
                                id = {el.id}  
                                key = {`${el.id}#${i}`}  
                                img_src = {el.profile_path} 
                                name ={el.name}/>
                    })
                }
            </div>
        </div>
    )
}