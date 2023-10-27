// import { useState } from 'react';
import {PropTypes} from 'prop-types'

export default function CounterButton({by,incrementMethod,decrementMethod}) {


    // const buttonStyle = {
    //     fontSize:"16px",
    //     backgroundColor:"#00a5ab",
    //     width:"100px",
    //     margin:"10px",
    //     color:"white",
    //     padding:"15px",
    //     borderRadius:"30px",

    // }

    // const [count,setCount] = useState(0)

    // console.log("by :"+by)
    // console.log("by :"+typeof(by))

    // function incrementCounterFunction(){
    //
    //     // setCount(count+by)
    //     incrementMethod(by)
    //     // console.log("count :"+count);
    //     // console.log("setCount :"+setCount);
    //     // console.log("increment clicked");
    // }

    // function decrementCounterFunction(){
    //     // setCount(count-by)
    //     decrementMethod(by)
    // }


    return (
        <div className = "Counter" >
            <div>
            <button className="counterButton" onClick={()=>incrementMethod(by)} >+{by}</button>
            <button className="counterButton" onClick={()=>decrementMethod(by)} >-{by}</button>
            </div>
        < /div>
    )
}

CounterButton.propTypes = {
    by:PropTypes.number
}

CounterButton.defaultProps = {
    by:1
}
