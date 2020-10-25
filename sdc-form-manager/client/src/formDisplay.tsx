import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql'
import { formQuery } from './query'

export const FormDisplay = () => {
  const { procedureId } = useParams<{ procedureId: string }>();
  const [formVars, setFormVars] = useState<any>({ id: procedureId })
  const [form,] = useQuery({
    query: formQuery,
    variables: formVars
  })
  const { data, fetching, error } = form;
  console.log(procedureId);
  return (
    <div>
      <p>{procedureId}</p>
    </div>
  )
};