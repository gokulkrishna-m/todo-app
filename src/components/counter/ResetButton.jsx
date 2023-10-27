export default function ResetFunction({resetMethod}){


// function resetCounterFunction(){
//   resetMethod()
// }

  return(
    <button className="resetButton" onClick={resetMethod} >Reset</button>
  )
}
