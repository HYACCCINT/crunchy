import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fallbackExchangeIO, useMutation, useQuery } from 'urql';
import { uploadFormQuery, formQuery } from '../query';
import {TextInput, Button, Search} from 'carbon-components-react'
import './DashBoard.scss'

export const DashBoard = () => {
    const [searchInput, setSearchInput] = useState('');

    const search = { // make sure all required component's inputs/Props keys&types match
    id:"searchForm",
    labelText:"Procedure ID",
    onChange: (event:any) => setSearchInput(event.target.value)
  }
  return (
    <div className="dashBoard">
    <div className="searchWrap"><Search {...search} /></div>
        
    </div>
  )
};
