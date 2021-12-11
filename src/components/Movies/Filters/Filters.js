import { RelizeYear } from "./RelizeYear/RelizeYear"
import styles from './Filters.module.css'
import { Geners } from "./Genres/Genres"
import { memo } from "react";

export const Filters = memo(({onYearChange,onGenresChange}) => {
    console.log("filter rendred");
    return (
        <div className = {styles.filters_block}>
            <RelizeYear onYearChange = {onYearChange}/>
            <Geners onGenresChange = {onGenresChange}/>
        </div>
    )
})