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
  console.log(data);
  const tempData = getTempData();
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <h3>{tempData.name}</h3>
      <h5>Type: {tempData.lineage}</h5>
      <h6>Version: {tempData.version}</h6>
      {tempData.patientId === "template" ? <h5>Patient: {tempData.patientId}</h5> : null}
      {tempData.metaProperties.map((item) => { return Object.entries(item).map(([key, value]) => <p>{key}: {value}</p>) })}
      <br></br>
      {tempData.sections.map(item => {
        return (
          <div>
            <p>id: {item.id}</p>
            <p> OTHER PROPERTIES HERE </p>
            {makeQuestionList(item.questionList)}
          </div>
        )
      })}
      <br></br>
      <p>Footer: {JSON.stringify(tempData.footer)}</p>
    </div>
  )
};

function makeQuestionList(questions: any) {
  return (
    <div>
      {questions.map((question: any) => {
        return (
          <div>
            <h4 className="blue-heading">{question.name}: {question.title}</h4>
            {question.type === "text" ? (<input type="text"></input>) : null}
            {question.type === "single choice text" ? (
              question.response.answerChoices.map((choice: any) => {
                return <p className="questionp"><input type="radio" name="q1" value="1"></input>{choice.name}: {choice.title}</p>;
              })
            ) : null}
            {question.questions ? makeQuestionList(question.questions) : null}
          </div>
        )
      })}
    </div>
  )
}

function getTempData() {
  return {
    procedureId: "CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF",
    patientId: "Template",
    name: "CCO Synoptic Template for  Stroke",
    lineage: "CT_Stroke_CCO.358",
    version: "1.0.0.DRAFT",
    metaProperties: [
      {
        "name": "Copyright",
        "type": "CAPeCC_static_text",
        "styleClass": "copyright",
        "propName": "Copyright",
        "val": "(c) 2018 College of American Pathologists.  All rights reserved.  License required for use."
      },
      {
        "name": "GenericHeaderText",
        "type": "CAPeCC_static_text",
        "propName": "GenericHeaderText",
        "val": "CCO Radiology Synoptic Template"
      }
    ],
    sections: [
      {
        "id": "76221.100004300",
        "_rev": "1-db2ccef0d88ddd64352b66d5a5424ea4",
        "title": "Administrative &amp; Identification Data",
        "name": "S_76221",
        "documentType": "SDCSection",
        "questionList": [
          {
            "qid": "76219.100004300",
            "name": "Q_76219",
            "title": "Report Date",
            "type": "text",
            "response": {
              "userInput": ""
            }
          },
          {
            "qid": "76413.100004300",
            "name": "Q_76413",
            "title": "Report completed by ",
            "type": "text",
            "response": {
              "userInput": ""
            }
          },
          {
            "qid": "76325.100004300",
            "name": "Q_76325",
            "title": "Procedure ",
            "type": "single choice text",
            "response": {
              "answerChoices": [
                {
                  "name": "LI_NS_76240",
                  "id": "76240.100004300",
                  "title": "LDCT"
                },
                {
                  "name": "LI_Oth_76239",
                  "id": "76239.100004300",
                  "title": "Other (specify)",
                  "textItem": true
                }
              ],
              "userInput": []
            }
          }
        ]
      }
    ],
    footer: {
      "name": "footer",
      "ID": "Footer.CT_Stroke_CCO.358_1.0.0.DRAFT_sdcFDF",
      "properties": [
        {
          "type": "meta",
          "styleClass": "copyright",
          "propName": "CopyrightFooter",
          "val": "(c) 2018 College of American Pathologists.  All rights reserved.  License required for use."
        }
      ]
    }
  }
}