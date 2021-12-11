import { Progress } from 'antd'
import { NavLink } from 'react-router-dom';
import styles from './Movies.module.css'

export const MovieList = ({img,name,rating,poster_path,id}) => {
    
    const imgPath = img || poster_path;
    const rate = rating * 10;
    return (
      
       <NavLink to = {`/movie/${id}`} className= {styles.movie_box } >
            
           <img className ={styles.movie_img} 
           alt ={'movie'}
           
           src = {imgPath ? 
                    `https://image.tmdb.org/t/p/w500${imgPath}` 
                    : 'https://www.abpiperth.com/wp-content/uploads/2014/10/Fall-Movie-Review.jpg' }/>

           <div className = {styles.movie_info}>
               <h3>{name}</h3>
               <div>
                    <Progress 
                        width = {50}
                        strokeColor = {rate >= 70 ? 'green' : 'orange'} 
                        strokeLinecap="square" 
                        type="circle" percent={rate} />
                </div>
           </div>
       </NavLink>
    
    )
}