import { Select } from "antd"


const {Option} = Select;
export const RelizeYear = ({onYearChange}) => {
    const years = [];
  
    const currYear = new Date().getUTCFullYear();
    for(let i = currYear;i >= 1995;i --){
        years.push(<Option key= {i} value = {i+""}>{i}</Option>);
    }   
    const onYearSelect = (e) => {
        onYearChange(e)
    }
    return (
        <>
            <h2>Relize year :</h2>
            <Select 
            onChange = {onYearSelect}
            style = {{width : '250px',marginBottom : '20px'}}
            size = "large"
            
            defaultValue = {''}>
                <Option value = {'empty'}></Option>
                {years.map((y,i) => y )}
            </Select>
        </>
    )
}