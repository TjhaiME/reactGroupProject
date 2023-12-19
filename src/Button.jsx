//button component?
//https://www.freecodecamp.org/news/how-to-use-props-in-react/

import * as React from 'react'

function ReactButton(props){
    const buttonFunc = props.buttonFunc
    const argument = props.argument //for some functions without input it is left as undefined
    //To my suprise buttonFunc(undefined) works for a function that is meant to be called with no arguments
    const name = props.name

    return (
        <div>
            <button onClick={() => {return buttonFunc(argument)}}>
                {name}
            </button>
        </div>
    )
}

export default ReactButton
   