import styles from './MovieDetail.module.css';
export const Crew = ({name,job}) => {
    return (
        <div className = {styles.Crew}>
            <h3>{name}</h3>
            <div>{job}</div>
        </div>
    )
}