import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'urql';
import { deleteFormQuery } from './query';

export const MainPage = () => {
  const history = useHistory();
  const [, deleteForm] = useMutation(deleteFormQuery);

  const handleProcedureIdClick = async (action: any, ...params: any) => {
    const procedureId = prompt('Please enter the Procedure ID');
    if (!validateId(procedureId)){
      return;
    }
    await action(procedureId, ...params);
  }

  const displayFormAction = async (procedureId: string) => {
    history.push('/formdisplay/' + procedureId);
  }

  const deleteFormAction = async (procedureId: string) => {
    const result = await deleteForm({ id: procedureId });
    if (!result.error) alert(`Form ${procedureId} deleted!`);
    else alert(`Form deletion failed. There is no form for ID ${procedureId}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="menu-button">Upload Form</button>
        <button className="menu-button" onClick={() => handleProcedureIdClick(displayFormAction)}>Display Form</button>
        <button className="menu-button">Replace Form</button>
        <button className="menu-button" onClick={() => handleProcedureIdClick(deleteFormAction)}>Delete Form</button>
      </header>
    </div>
  );
};

function validateId(procedureId: string | null) {
  return procedureId !== null && procedureId !== "";
}