import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'urql'
import { formQuery, updateResQuery } from '../query'
import {SDCQuestion} from './SDCQuestion'
import {Button, Form} from 'carbon-components-react'
import "./FormFill.scss"
export const FormFill = () => {
  const { formID } = useParams<{ formID: string }>();
  const [formVars] = useState<any>({ id: formID })
  const [,uploadRes] = useMutation(updateResQuery);
  let patientID=0;
  const [input, setInput] = useState<any>({id:`${formID}.res.${patientID}`})
  const [formObj,] = useQuery({
    query: formQuery,
    variables: formVars
  })
  const [formArray, setFormArray] = useState<any>([]);
  const { data, fetching, error } = formObj;
  if (fetching) return (<p>Loading...</p>);
  if (formArray.length == 0) {
    data.form.map((item:any) => {
      delete item.__typename;
      formArray.push(item);
    })
  }
  const renderSections = (sections: any) => {
    if (!sections){
      return null;
    }
    return (
      <div className='sectionWrap'>
        {sections.map((section: any) => {
          if (section === null) return null;
          return (
            <div>
              <p className="sectionTitle">Section {section.name}: {section.title}</p>
              {section.mustImplement ? <p>* Must Complete this section</p> : null}
              {renderQuestions(section.questions)}
              {renderSections(section.subSections)}
            </div>
          )
        })}
      </div>
    )
  }


  const renderQuestions = (questions: any) => {
    return (
      <div>
        {questions.map((question: any) => {
          const qIndex = formArray.findIndex(((obj:any) => obj.id == question.id));
          return <div> 
            <SDCQuestion  question={formArray[qIndex]} formArray={formArray} setFormArray={setFormArray}/>
            {question.subQuestions? renderQuestions(question.subQuestions):null}
          </div>
        })}
      </div>
    )
  }
  const renderProperties = (data: any) => {
    return (
      <div className="fillerProperties">
        <h5>Title: {data.title}</h5>
        <h6>Version: {data.lastModified}</h6>
        {/*<h5>Release Date: {(new Date(data.releaseDate)).toLocaleString()}</h5>*/}
        <h6>Lineage: {data.lineage}</h6>
        {data.patientID !== "template" ? <h5>Patient: {data.patientID}</h5> : null}
      </div>
    )
  }
  
  const assemble = (data: any): any => {
    if(!data) return {};
    let { sectionIDs, ...form} = data[0];
    form.sections = [];
    sectionIDs.forEach((sectionId: string) => form.sections.push(assembleSection(sectionId, data)));
    return form;
  }
  
  const assembleSection = (sectionId: string, data: any): any => {
    const sectionObj = data.find((item: any) => item.docType === "SDCSection" && item.id === sectionId);
    let {subSectionIDs, ...section} = sectionObj;
    section.subSections = [];
    subSectionIDs.forEach((id: string) => section.subSections.push(assembleSection(id, data)));
    let questions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superSectionID === sectionId);
    section.questions = [];
    questions.forEach((question: any) => section.questions.push(assembleQuestions(question, data)));
    return section;
  }
  
  const assembleQuestions = (question: any, data: any): any => {
    const subQuestions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superQuestionID === question.id);
    question.subQuestions = subQuestions;
    return question;
  }
  
  const response = assemble(formArray);
  
const formSubmit = () => {
  const time = Date.now()
  const responseID = `${response.id}-${patientID}-${time.toString()}`
  response.id = responseID;
  uploadRes({id: responseID, input: response})
  console.log(response,"response");
}
// console.log(formArray.filter((item:any) => {
//   return item.docType=='SDCQuestion' && item.superQuestionID !== null
// }),"form");
  return (
    <div className="fillerWrap">
    <div className="fillerHead">
      <h3>{response.formID}</h3>
      <h3>{response.name}</h3>
      {renderProperties(response)}
    </div>
      <Form onSubmit={formSubmit} className="fillerForm">
      <br></br>
      {renderSections(response.sections)}
      <br></br>
      <Button onClick={formSubmit}>Submit</Button>
      </Form>
      <p className="footer">Footer: {(response.footer)}</p>
    </div>
  )
};

