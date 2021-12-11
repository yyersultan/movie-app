import styles from './PersonDetail.module.css';

const gender ={1 : 'Male',2 : 'Female'}

export const PersonInfo = ({person}) => {
    return (
        <div className = {styles.PersonInfo}>
            <img src = {`https://image.tmdb.org/t/p/w300${person.profile_path}`} alt =''/>
            <div className = {styles.PersonInfoBio}>
                <h2>Personal Info</h2>
                <div>
                    <h2>Known for</h2>
                    <div>{person.known_for_department}</div>
                </div>
                <div>
                    <h2>Gender</h2>
                    <div>{gender[person.gender]}</div>
                </div>
                <div>
                    <h2>Birthday</h2>
                    <div>{person.birthday}</div>
                </div>
                <div>
                    <h2>Place of Birth</h2>
                    <div>{person.place_of_birth}</div>
                </div>
                <div>
                    <h2>Also Known As</h2>
                    {
                        person.also_known_as.map((el,i) => {
                            return <div key = {el + 'a' + i}> {el}</div>
                        })
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}