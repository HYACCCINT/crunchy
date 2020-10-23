import React, { useState, useContext } from 'react';
import { useMutation, useQuery } from 'urql';
import { updateFormQuery, formQuery } from './query';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export const DBExample = () => {
  //couch db
  const [, updateForm] = useMutation(updateFormQuery)
  const initialState = {
    id: '',
    title: '',
    name: '',
    procedureID: ''
  };
  const [state, setState] = useState<any>(initialState)
  // const [, getForm] = useQuery(formQuery)

  // user input/form handling

 

  const handleChange = (inputID: string, inputValue: any) => {
    let clone = {...state};
    clone[inputID] = inputValue;
    setState(clone);
    console.log(state, "fdff")
  }
  const onChange = (event: any) => {
    handleChange(event.target.id, event.target.value);
  }


  return (
    <div className="dbExampleWrap">
      <button onClick={() => updateForm(
        // If you have any question as to why a mutation works or 
        // doesn't work, please try it out with http://localhost:5000/graphql
        // note: this requires a running backend (npm run server)
        {
          id: 'ttttttt',
          input: {
            // it is important that we include the id again
            id: 'ttttttt',
            procedureID: "dfsfsdfsd"
          }
        }
      )}>Click me to send the json file in the code to database</button>
      <div>


      </div>
    </div>
  )
};