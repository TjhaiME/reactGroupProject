//button component?
//https://www.freecodecamp.org/news/how-to-use-props-in-react/

import * as React from 'react'

function ReactButton(props){
    const buttonFunc = props.buttonFunc
    const argument = props.argument
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
   