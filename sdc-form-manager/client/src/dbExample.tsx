import React, { useState, useContext } from 'react';
import { useMutation, useQuery } from 'urql';
import { updateFormQuery, formQuery } from './query';
// temporary examplar for sake of demo, we shouldn't actually be using materials ui
import TextField from '@material-ui/core/TextField';
// temporary examplar for sake of demo

export const DBExample = () => {
  //couch db
  const [, updateForm] = useMutation(updateFormQuery)

  // form test 2 : user input / form handling
  const initialState = {
    id: 'test2',
    title: '',
    patientID: '',
    procedureID: ''
  };
  const [test2, setTest2] = useState<any>(initialState)

  const handleChange = (inputID: string, inputValue: any) => {
    let clone = { ...test2 };
    clone[inputID] = inputValue;
    setTest2(clone);
  }
  const onChange = (event: any) => {
    handleChange(event.target.id, event.target.value);
  }

  // form test 3: querying a document
  const [test3, setTest3] = useState<any>({ id: 'test1' })
  const [form,] = useQuery({
    query: formQuery,
    variables: test3
  })
  const { data, fetching, error } = form;
  return (
    <div >
      <div className="dbExampleWrap1">
        Test 1: POST mutation to server from JSON object in code
      <button onClick={() => updateForm(
        // If you have any question as to why a mutation works or 
        // doesn't work, please try it out with http://localhost:5000/graphql
        // note: this requires a running backend (npm run server)
        {
          id: 'test1',
          input: {
            // it is important that we include the id again
            id: 'test1',
            procedureID: "test2"
          }
        }
      )}>Click me to send the json file in the code to server</button>
      </div>

      <div className="dbExampleWrap2"
      // again.. we shouldn't be using materials ui components.. 
      >
        <div style={{ marginBottom: "3rem" }}>
          Test2, fill out the fields of the form, and click submit to POST
        </div>
        <TextField id="id" label="ID" required defaultValue={test2.id} onChange={(e: any) => onChange(e)} />
        <TextField id="patientID" label="PatientID" defaultValue={test2.patientID} onChange={(e: any) => onChange(e)} />
        <TextField id="title" label="Title" defaultValue={test2.title} onChange={(e: any) => onChange(e)} />
        <TextField id="procedureID" label="Procedure ID" defaultValue={test2.procedureID} onChange={(e: any) => onChange(e)} />
        <button onClick={() => updateForm({ id: test2.id, input: test2 })} style={{ marginTop: "3rem" }}>
          Click to POST above to server
      </button>
      </div>

      <div className="dbExampleWrap3">
        <div style={{ marginBottom: "3rem" }}>
          Test3, GET the document with the below ID from server
        </div>
        <TextField id="test3id" label="ID of Requested document" required defaultValue={test3.id} onChange={(e: any) => setTest3({ id: e.target.value })} />
        <div style={{ overflow: "visible", marginTop: "2rem", wordWrap: "break-word", maxWidth: "20rem" }}>
          ** note, the document with this ID has to BE in the db for this to get anything from the db, otherwise it logs a 500 error on console, check it out!
          Result below:
        </div>
        <div style={{ overflow: "visible", marginTop: "2rem", wordWrap: "break-word", maxWidth: "20rem" }}>
          {error ? 'did not find document with this id in db' : fetching ? 'loading...' : JSON.stringify(data)}
        </div>
      </div>
    </div>
  )
};
