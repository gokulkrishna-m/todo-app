/* eslint-disable no-lone-blocks */
//import logo from './logo.svg';
import './App.css';
// import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';

function App() {
    return (
        <div className = "App" >
          {/*<Counter />*/}
          <TodoApp/>
        </div>
      );
    }

    {
        /* function component */
    }

    { /* {property1: 'value1', property2: 'value2'} */ }

    {
        /* function PlayingWithprops(properties) {
                console.log(properties);
                console.log(properties.property1);
                console.log(properties.property2);
                return ( <
                    div > Props < /div>
                )
            } */
    }

    {/*function PlayingWithprops({ property1, property2 }) {

        console.log(property1);
        console.log(property2);
        return ( <
            div > Props < /div>
        )
    }*/}

    export default App;
