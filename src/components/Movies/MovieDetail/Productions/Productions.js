import styles from './Production.module.css';

export const Productions = ({production_companies}) => {
    return (
        <div className = {styles.Productions}>
            
            {
                production_companies.map((el,i) => {
                    return <ProductionDetial 
                            key = {el.id + '!' + i}
                            name = {el.name}
                            logo_path = {el.logo_path}/>
                })
            }
        </div>
    )
}

const ProductionDetial = ({logo_path,name}) => {
    return <div className = {styles.ProductionDetial}>
        <img src = {'https://image.tmdb.org/t/p/w200'+logo_path} alt = "compony"/>
        
    </div>
}