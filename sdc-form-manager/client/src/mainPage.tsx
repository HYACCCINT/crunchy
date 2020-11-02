import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'urql';
import { deleteFormQuery } from './query';

export const MainPage = () => {
  const history = useHistory();
  const [, deleteForm] = useMutation(deleteFormQuery);

  const handleProcedureIdClick = async (action: any, ...params: any) => {
    const formId = prompt('Please enter the Form ID');
    if (!validateId(formId)){
      return;
    }
    await action(formId, ...params);
  }

  const displayFormAction = async (formId: string) => {
    history.push('/formdisplay/' + formId);
  } 
  
  const deleteFormAction = async (formId: string) => {
    const result = await deleteForm({ id: formId });
    if (!result.error) alert(`Form ${formId} deleted!`);
    else alert(`Form deletion failed. There is no form for ID ${formId}`);
  }

  const uploadFormAction = async (action: string) => {
    history.push('/upload-form/' + action);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="menu-button" onClick={() => uploadFormAction('new')}>Upload Form</button>
        <button className="menu-button" onClick={() => handleProcedureIdClick(displayFormAction)}>Display Form</button>
        <button className="menu-button" onClick={() => handleProcedureIdClick(deleteFormAction)}>Delete Form</button>
        <button className="menu-button" onClick={() => uploadFormAction('update')}>Update Form</button>
      </header>
    </div>
  );
};

function validateId(procedureId: string | null) {
  return procedureId !== null && procedureId !== "";
}