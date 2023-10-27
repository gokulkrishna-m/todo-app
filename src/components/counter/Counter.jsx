import { useState } from 'react';
import './Counter.css'
// import {PropTypes} from 'prop-types'

import CounterButton from './CounterButton'
import ResetButton from './ResetButton'

export default function Counter(){

    const [count,setCount] = useState(0)

    function incrementCounterParentFunction(by){

        setCount(count+by)
        console.log("Parent method called");

        // console.log("count :"+count);
        // console.log("setCount :"+setCount);
        // console.log("increment clicked");
    }

    function decrementCounterParentFunction(by){

        setCount(count-by)
        console.log("Parent method called");

        // console.log("count :"+count);
        // console.log("setCount :"+setCount);
        // console.log("increment clicked");
    }

    function resetCounterParentFunction(){
      // count = 0
      setCount(0)
    }


    return(
        <>
          <span className="totalCount">{count}</span>
          <CounterButton incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
          <CounterButton by={2} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
          <CounterButton by={5} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
          <ResetButton resetMethod={resetCounterParentFunction}/>
        </>
    )
}
