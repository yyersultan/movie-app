import { NavLink } from 'react-router-dom';
import styles from './Person.module.css';

export const PersonItem = ({img_src,name,id}) => {
    return (
        <NavLink to = {`/person/${id}`} className = {styles.PersonItem}>
            <img src ={`https://image.tmdb.org/t/p/w300${img_src}`} alt=''/>
            <div className = {styles.PersonName}>
                <div>{name}</div>
            </div>     
        </NavLink>
    )
}