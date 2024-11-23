import { useNavigate } from 'react-router-dom';
import "../index.css"
export default function Index(){
    function Fn(){
        let navigate=useNavigate()
        return(
            <button onClick={()=>{navigate("/shop")}}>start</button>
        )
    }
    return(
    <>
        <div><h1><strong>welcome to my shop</strong></h1></div>
        <div><Fn/></div> 
    </>
    )
}