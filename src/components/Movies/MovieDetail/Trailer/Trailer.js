import { Modal } from "antd"
import { createRef, memo, useEffect, useState } from "react"
import { API_KEY3, instance as axios} from "../../../../api/api";


export const Trailer = memo(({mode,id,playTrailer}) => {
    const[link,setLink] = useState('');
    const ref = createRef();
    useEffect(() => {
        const getTrailer = async() => {
            try{
                const response = await axios.get(`/movie/${id}/videos?api_key=${API_KEY3}`);
                setLink(response.data.results[0].key);
                console.log(link);
            }catch(e){

            }
        }
         
        getTrailer();
        // eslint-disable-next-line
    },[]);
    const onModalClose = () => {
        playTrailer();
    }
    return(
        <Modal 
        onCancel = {onModalClose}
        visible = {mode} 
        width = {1000}>
             <iframe   ref = {ref} allowFullScreen  width="900" height="800" title = 'trailer'
                src= {`https://www.youtube.com/embed/${link}`}>
            </iframe> 
        </Modal>
    )
})