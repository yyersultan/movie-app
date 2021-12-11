import { NavLink } from 'react-router-dom';
import styles from './Cast.module.css'

const img_head = 'https://image.tmdb.org/t/p/w200';
export const CastDetail = ({id,profile_path,name,character}) => {
    return (
        <NavLink to = {`/person/${id}`} className = {styles.CastDetail}>
            <img src = {img_head+profile_path} alt = {'Cast'}/>
            <div className = {styles.castNames}>
                <h2>{name}</h2>
                <div>{character}</div>
            </div>
        </NavLink>
    )
}