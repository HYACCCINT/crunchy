import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'urql';
import { updateFormQuery, formQuery } from '../query';

export const FormUpload = () => {
  const { action } = useParams<{ action: string }>();
  let state = {pid: "", file: undefined, fileName: "", id:0};
  const [,updateForm] = useMutation(updateFormQuery);
  const initialState = {
    id: '',
    title: '',
    name: '',
    procedureID: ''
  };
  const [formToUpdate, setFormToUpdate] = useState<any>(initialState)

  const handleSubmit = (event: any) => {
    let clone = { ...formToUpdate };
    clone[state.id] = {id: state.id, title: state.fileName, procedureID: state.pid};
    setFormToUpdate(clone);
    alert(`Form was ${action === "new" ? "uploaded" : "updated"} with title: ${state.fileName} and procedure ID: ${state.pid}`);
    state.id++;
  }
  const updateFile = (event: any) => {
    state.file = event.currentTarget.files[0];
    state.fileName = event.currentTarget.files[0].name;
    // console.log(state.fileName);
  }
  const updatePID = (event: any) => {
    state.pid = event.currentTarget.value;
    // console.log(state.pid);
  }
  return (
    <div className="update-form-container">
      <h1>{action === "new" ? "Upload" : "Update"} a Form</h1>
      <form id="FormUpdate" onSubmit={handleSubmit}>
        <label>
          Procedure ID:
          <input type="text" onChange={updatePID}/>
        </label>
        <label>
          File:
          <input type="file" onChange={updateFile}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
};

export default FormUpload;