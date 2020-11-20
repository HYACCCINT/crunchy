import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql'
import { formQuery } from '../query'
import {TextInput, RadioButtonGroup, RadioButton} from 'carbon-components-react'
export const FormFill = () => {
  const { formID } = useParams<{ formID: string }>();
  const [formVars, setFormVars] = useState<any>({ id: formID })
  let patientID=0;
  const [input, setInput] = useState<any>({id:`${formID}.res.${patientID}`})
  const [form,] = useQuery({
    query: formQuery,
    variables: formVars
  })
  const { data, fetching, error } = form;
  if (fetching) return (<p>Loading...</p>);
  const renderSections = (sections: any) => {
    if (!sections){
      return null;
    }
    return (
      <div>
        {sections.map((section: any) => {
          if (section === null) return null;
          return (
            <div>
              <p>Section {section.name}: {section.title}</p>
              {section.mustImplement ? <p>* Must Complete this section</p> : null}
              {renderQuestions(section.questions)}
              {renderSections(section.subSections)}
            </div>
          )
        })}
      </div>
    )
  }
  const text = { 
  onChange: (event:any) => setInput({ [event.target.id]:event.target.value, ...input, })
  }
  const renderQuestions = (questions: any) => {
    return (
      <div>
        {questions.map((question: any) => {
          if (question === null || question.isEnabled === false) return null;
          return (
            <div>
              <h4 className="blue-heading">{question.mustImplement ? "*" : ""}</h4>
              {question.questionType === "text" ? (<TextInput id={question.name} labelText={question.title} {...text}/>) : null}
              {question.questionType === "number" ? (<input type="number"></input>) : null}
              {/* {question.questionType.includes("single choice") ? (
                  <RadioButtonGroup name={question.name}>
                      {question.response.choices.map((choice: any) => {
                        return <RadioButton value={choice.name} labelText={choice.title}/>
                })}
                </RadioButtonGroup>
              ) : null} */}
              <p>{question.textAfterResponse}</p>
              {question.subQuestions ? renderQuestions(question.subQuestions) : null}
            </div>
          )
        })}
      </div>
    )
  }
  const renderProperties = (data: any) => {
    return (
      <div>
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
  
  const assembledData = assemble(data.form);
  
  return (
    <div>
      <h3>{assembledData.formID}</h3>
      <h3>{assembledData.name}</h3>
      {renderProperties(assembledData)}
      {/*renderContacts(assembledData)*/}
      <br></br>
      {renderSections(assembledData.sections)}
      <br></br>
      <p>Footer: {(assembledData.footer)}</p>
    </div>
  )
};

