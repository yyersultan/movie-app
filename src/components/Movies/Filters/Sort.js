import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { memo, useState } from 'react';
import styles from './Filters.module.css';

const { Option } = Select;

export const Sort = memo(({sortValue,changeSort}) => {
    console.log("sort rendred");
    const[open,setOpen] = useState(false);
    const onSortClick = () => {
        setOpen(!open);
    }
    const onSelectChange = (value) => {
       
        changeSort(value);
    }
    return (
        <div className = {styles.filters_block}>
            <h2 
            onClick = {onSortClick}
            className = {styles.sort_title}>
                <div className = {styles.sort_Text}>
                    Сортировать 
                </div>
                {
                    open ? <DownOutlined />:
                    <RightOutlined />
                }
                
            </h2> 
            <div className = {open ? styles.show_select: styles.hide_select}>
                <h4>Сортировать результаты по</h4>
                <Select  
                onChange = {onSelectChange}
                size = {'large'}
                defaultValue = {sortValue} 
                className = {styles.Select}>
                    <Option value = {'popularity.desc'}>
                        popularity.desc
                    </Option>
                    <Option value = "popularity.asc">
                        popularity.asc
                    </Option>
                    <Option value = 'vote_average.desc'>
                        vote_average.desc
                    </Option>
                    <Option value = 'vote_average.asc'>
                        vote_average.asc
                    </Option>
                </Select>
            </div>
        </div>
    )
})