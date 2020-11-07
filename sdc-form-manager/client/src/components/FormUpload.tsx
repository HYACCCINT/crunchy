import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'urql';
import { uploadFormQuery, formQuery } from '../query';

export const FormUpload = () => {
  const { action } = useParams<{ action: string }>();
  const [,uploadForm] = useMutation(uploadFormQuery);
  const initialFormState = {
    id: '',
    title: '',
    name: '',
    procedureID: ''
  };
  const initialFileData = {
    fileName: '',
    contents: ''
  }
  const [formToUpdate, setFormToUpdate] = useState<any>(initialFormState);
  const [fileData, setFileData] = useState<any>(initialFileData);
  const handleSubmit = (event: any) => {

    /*

    // check a form has been entered

    if (formToUpdate.procedureID === initialFormState.procedureID) {
      alert('Please enter a procedure ID');
      return;
    }

    if (fileData.fileName === initialFileData.fileName) {
      alert('Please upload a form');
      return;
    }*/
  
    let clone = { ...formToUpdate };
    clone[formToUpdate.id] = {id: formToUpdate.id, input: {id: formToUpdate.id, title: fileData.fileName, 
      procedureID: formToUpdate.procedureID, xml: fileData.contents, docType: 'xml'}};
    setFormToUpdate(clone);
    uploadForm(clone);
    alert(`Form was ${action === "new" ? "uploaded" : "updated"} with title: ${fileData.fileName} and procedure ID: ${formToUpdate.procedureID}`);
   /* 
    // reset state of FormUpload
    
    setFormToUpdate(initialFormState);
    setFileData(initialFileData);
    */
  }
  const updateFile = async (event: any) => {

     let fileIn = event.currentTarget.files[0];
     let textPromise = fileIn.text();

     textPromise.then((text: any) => text);

     let content = await fileIn.text();
    // console.log(content);
    setFileData({fileName: fileIn.name, contents:  content});
    // console.log(state.fileName);
  }
  const updateprocedureID = (event: any) => {
    let newProcedureID = event.currentTarget.value;

    // create random unique id by reversing procedure ID
    let newID = newProcedureID.split("");
    newID = newID.reverse();
    newID = newID.join();
    setFormToUpdate({id: newID, procedureID: newProcedureID});
    // console.log(state.procedureID);
  }
  return (
    <div className="update-form-container">
      <h1>{action === "new" ? "Upload" : "Update"} a Form</h1>
      <form id="FormUpdate" onSubmit={handleSubmit}>
        <label>
          Procedure ID:
          <input type="text" onChange={updateprocedureID}/>
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
