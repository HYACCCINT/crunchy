import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'urql'
import { updateFormQuery } from './query'

export const DBExample = () => {
  const [, updateForm] = useMutation(updateFormQuery)

  return (
    <div>
      <button onClick={() => updateForm({
        id: 'ttttttt',
        input: {
          id: 'ttttttt'
        }
      })}>dsufhsaidufisduhfiusdh</button>
    </div>
  )
};