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
  const tempDataArr = getTempData();
  const tempData = tempDataArr[0];
  return (
    <div>
      <h3>{tempData.ProcedureId}</h3>
      <h3>{tempData.name}</h3>
      {renderProperties(tempData)}
      {renderContacts(tempData)}
      <br></br>
      {renderSections(tempData.Sections)}
      <br></br>
      <p>Footer: {(tempData.Footer)}</p>
    </div>
  )
};

function renderSections(sections: any) {
  return (
    <div>
      {sections.map((section: any) => {
        if (section === null) return null;
        return (
          <div>
            <p>Section {section.Name}: {section.Title}</p>
            {section.MustImplement ? <p>* Must Complete this section</p> : null}
            {renderQuestions(section.Questions)}
            {renderSections(section.Subsections)}
          </div>
        )
      })}
    </div>
  )
}

function renderQuestions(questions: any) {
  return (
    <div>
      {questions.map((question: any) => {
        if (question === null || !question.IsEnabled) return null;
        return (
          <div>
            <h4 className="blue-heading">{question.Name}: {question.Title} {question.MustImplement ? "*" : ""}</h4>
            {question.Type === "text" ? (<input type="text"></input>) : null}
            {question.Type === "number" ? (<input type="number"></input>) : null}
            {question.Type === "single choice" ? (
              question.Answer.Choices.map((choice: any) => {
                return <p className="questionp"><input type="radio" name="q1" value="1"></input>{choice.Name}: {choice.Title}</p>;
              })
            ) : null}
            <p>{question.TextAfterResponse}</p>
            {question.SubQuestions ? renderQuestions(question.SubQuestions) : null}
          </div>
        )
      })}
    </div>
  )
}

function renderContacts(data: any) {
  return (
    <div>
      <h5>Organization: {data.Contact.OrganizationName}</h5>
      <span>Emails: {data.Contact.emails.map((email: any) => <a href="javascript:void(0)">{email.Name} </a>)}</span>
    </div>
  )
}

function renderProperties(data: any) {
  return (
    <div>
      <h5>Release Date: {(new Date(data.releaseDate)).toLocaleString()}</h5>
      <h5>Title: {data.MetaProperties.Title}</h5>
      <h6>Version: {data.MetaProperties.Version}</h6>
      <h6>Order Number: {data.MetaProperties.properties.Order}</h6>
      {data.patientId !== "template" ? <h5>Patient: {data.PatientId}</h5> : null}
    </div>
  )
}

const getTempData = () => {
  return [{
    "ProcedureId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "Sections": [{
      "MustImplement": true,
      "Subsections": [null, null],
      "Title": "Title",
      "Questions": [{
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }, {
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }],
      "ID": "ID",
      "Mincard": 5,
      "Maxcard": 5,
      "Name": "Name"
    }, {
      "MustImplement": true,
      "Subsections": [null, null],
      "Title": "Title",
      "Questions": [{
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }, {
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "single choice",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "Choices": [
            {
              "Name": "LI_NS_76240",
              "ID": "76240.100004300",
              "Title": "LDCT"
            },
            {
              "Name": "LI_Oth_76239",
              "ID": "76239.100004300",
              "Title": "Other (specify)",
              "TextItem": true
            }
          ],
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }],
      "ID": "ID",
      "Mincard": 5,
      "Maxcard": 5,
      "Name": "Name"
    }],
    "releaseDate": "2016-08-29T09:12:33.001Z",
    "MetaProperties": {
      "Version": 0.8008281904610115,
      "Title": "Appendix form",
      "URI": "URI",
      "properties": {
        "Order": 6.027456183070403,
        "Val": "Val",
        "Type": "Type",
        "PropName": "PropName",
        "Propclass": "Propclass",
        "Name": "Name"
      }
    },
    "PatientId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Widget Adapter",
    "Footer": "Footer",
    "Contact": {
      "emails": [{
        "Name": "Name"
      }, {
        "Name": "Name"
      }],
      "OrganizationNmae": "OrganizationNmae"
    },
    "BodyProperties": {
      "Title": "Title",
      "Id": 1.4658129805029452,
      "Properties": [null, null]
    }
  }, {
    "ProcedureId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "Sections": [{
      "MustImplement": true,
      "Subsections": [null, null],
      "Title": "Title",
      "Questions": [{
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }, {
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }],
      "ID": "ID",
      "Mincard": 5,
      "Maxcard": 5,
      "Name": "Name"
    }, {
      "MustImplement": true,
      "Subsections": [null, null],
      "Title": "Title",
      "Questions": [{
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "number",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": 0
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }, {
        "TextAfterResponse": "TextAfterResponse",
        "IsEnabled": true,
        "Title": "Title",
        "Properties": [null, null],
        "Name": "Name",
        "MustImplement": true,
        "Type": "text",
        "Answer": {
          "Attributes": {
            "FormResponseId": 2.027123023002322,
            "QuestionId": 4.145608029883936
          },
          "UserInput": ""
        },
        "MaxCard": 9,
        "Questionid": 3.616076749251911,
        "MinCard": 7,
        "SectionId": 2.3021358869347655,
        "SubQuestions": [null, null]
      }],
      "ID": "ID",
      "Mincard": 5,
      "Maxcard": 5,
      "Name": "Name"
    }],
    "releaseDate": "2016-08-29T09:12:33.001Z",
    "MetaProperties": {
      "Version": 0.8008281904610115,
      "Title": "Appendix form",
      "URI": "URI",
      "properties": {
        "Order": 6.027456183070403,
        "Val": "Val",
        "Type": "Type",
        "PropName": "PropName",
        "Propclass": "Propclass",
        "Name": "Name"
      }
    },
    "PatientId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Widget Adapter",
    "Footer": "Footer",
    "Contact": {
      "emails": [{
        "Name": "Name"
      }, {
        "Name": "Name"
      }],
      "OrganizationNmae": "OrganizationNmae"
    },
    "BodyProperties": {
      "Title": "Title",
      "Id": 1.4658129805029452,
      "Properties": [null, null]
    }
  }]
}
