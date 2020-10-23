import React from 'react';
import { useMutation, useQuery } from 'urql'
import { updateFormQuery } from './query'

export const DBExample = () => {
  const [, updateForm] = useMutation(updateFormQuery)

  return (
    <div>
      <button onClick={() => updateForm(
        // If you have any question as to why a mutation works or 
        // doesn't work, please try it out with http://localhost:5000/graphql
        // note: this requires a running backend (npm run server)
        {
        id: 'ttttttt',
        input: {
          // it is important that we include the id again
          id: 'ttttttt',
          procedureID:"dfsfsdfsd"
        }
      }
      )}>dsufhsaidufisduhfiusdh</button>
    </div>
  )
};