
import { Checkbox } from "antd"
import { useEffect, useState } from "react";
import { API_KEY3, instance as axios} from "../../../../api/api";

export const Geners = ({onGenresChange}) => {
    const[state,setState] = useState([]);
    const onGenresSelected = (e) =>{
        const {value,checked} = e.target;
        onGenresChange(value,checked);
    }
    useEffect(() => {
        const getGenres = async() => {
            const response = await axios.get(`genre/movie/list?api_key=${API_KEY3}`);
            setState(response.data.genres);
        }
        getGenres();
    },[]);
    return (
        <div>
            <h2>Genres</h2> 
            {
                state.map((el,i) =>{
                    return(
                    <div key = {`${el}=${i}`}> 
                        <Checkbox 
                        value ={el.id}
                        onChange = {onGenresSelected}>{el.name}</Checkbox>
                    </div>
                    )
            })
            }
        </div>
    )
}