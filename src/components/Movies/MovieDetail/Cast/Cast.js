import { memo } from 'react';
import styles from './Cast.module.css';
import { CastDetail } from './CastDetail';

export const Cast = memo(
    ({cast}) => {
    console.log(cast.id);
    return (
        <div className = {styles.Cast}>
            <h2>Top Billed Cast</h2>
            <div className = {styles.castList}>
                {
                    cast.map((el,i) => {
                        if(i < 10){
                            return <CastDetail 
                                    key = {`${el.id}@${i}`}
                                    id = {el.id}
                                    character = {el.character}
                                    profile_path = {el.profile_path}    
                                    name = {el.original_name}/>
                        }
                        return null
                    })
                }
            </div>
            
        </div>
    )}
)