import { NavLink } from 'react-router-dom';
import styles from './PersonDetail.module.css';


export const PersonBio = ({person,filmList}) => {
    
    return (
        <div className = {styles.PersonBio}>
            <h1>{person.name}</h1>
            <div className = {styles.PersonBioText}>
                <h3>Biography</h3>
                <div>
                    {
                        person.biography
                    }
                </div>
            </div>
            <div className = {styles.PersonBioFilms}>
                <h3>Known For</h3>
                <div className = {styles.PersonBioFilmList}>
                    {
                        filmList.map((el,i) => {
                            return(
                                <NavLink key = {`${el}~${i}`} to = {`/movie/${el.id}`} className = {styles.PersonBioKnownFor}>
                                    <img src = {`https://image.tmdb.org/t/p/original${el.backdrop_path}`} alt='bio'/>
                                    <div>{el.title}</div>
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}