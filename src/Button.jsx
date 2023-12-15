//button component?
//https://www.freecodecamp.org/news/how-to-use-props-in-react/

import * as React from 'react'

function ReactButton(props){
    const buttonFunc = props.buttonFunc
    return (
        <div>
            <button onClick={buttonFunc}>
                Click Me
            </button>
        </div>
    )
}

export default ReactButton
   