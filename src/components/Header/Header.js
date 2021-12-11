import { Button, Menu } from "antd";
import React, { memo, useState } from "react";
import {HomeOutlined,LoginOutlined,
    MenuUnfoldOutlined,MenuFoldOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from "react-router-dom";

export const Header = memo(
    ({isLogged}) => {
    console.log("header rendred");
    const[state,setState] = useState(false);
    const toggleCollapsed = () => {
        setState(!state);
    }

    return (
       <div style = {{width:256,height : '100vh',position:'fixed'}}>
           <Button onClick = {toggleCollapsed}>
               {React.createElement(state ? MenuUnfoldOutlined : MenuFoldOutlined)}
           </Button>
           <Menu
            style = {{height : '100%'}}
            defaultSelectedKeys = {['1']}
            mode = 'inline'
            theme = 'dark'
            inlineCollapsed = {state}
           >
               <Menu.Item key = '1' icon = {<HomeOutlined />}>
                   <NavLink exact to = '/'> Movies </NavLink>
               </Menu.Item>
               <Menu.Item key = '2' icon = {<UserOutlined />}>
                   <NavLink to = "/person">Persons</NavLink>
               </Menu.Item>
               <Menu.Item key = '3' icon = {<LoginOutlined />}>
                   {
                       isLogged 
                       ? <NavLink exact to = "/user">User</NavLink> 
                       : <NavLink to = "/login"> Login </NavLink>
                   }    
                   
               </Menu.Item>
           </Menu>
       </div> 
    )}
)

