//button component?
//https://www.freecodecamp.org/news/how-to-use-props-in-react/

import * as React from 'react'
import { useEffect } from 'react'

function ReactButton(props){
    const buttonFunc = props.buttonFunc
    const argument = props.argument
    const name = props.name

    // useEffect(() => {
    //     if (argument != undefined){

    //         return (
    //             <div>
    //                 <button onClick={buttonFunc(argument)}>
    //                     {name}
    //                 </button>
    //             </div>
    //         )
    
    //     }
    //   }, []
    // );

//else: buttonFunc(argument)
    return (
        <div>
            <button onClick={() => {return buttonFunc(argument)}}>
                {name}
            </button>
        </div>
    )
}

export default ReactButton
   