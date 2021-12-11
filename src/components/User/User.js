import { Redirect } from 'react-router';
import styles from './User.module.css';
import { Avatar, Button } from 'antd';



export const User = ({user,onLogout}) => {
    if(!user){
        return <Redirect to = '/login' />
    }
    
    return (
        <div className = {styles.User}>
            <div className = {styles.Content}>
                <div className = {styles.userInfo}>
                    <Avatar 
                    size ={128}
                    style = {{background : 'red'}}  ><h1>{user.username[0].toUpperCase()}</h1></Avatar>
                    <div className = {styles.userData}>
                        <div >Id : {user.id}</div>
                        <div >Name : {user.name ? user.name : 'Noname'}</div>
                        <div >Username : {user.username}</div>
                        <div >Language : {user.iso_3166_1}</div>
                        <Button
                        onClick = {onLogout}
                        className = {styles.logOut_btn}
                        size = {'large'}
                        type = 'ghost'>Logout</Button>
                    </div>
                
                </div>
            </div>

        </div>
    )
}