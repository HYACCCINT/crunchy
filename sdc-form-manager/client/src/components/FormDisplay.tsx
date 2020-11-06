import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql'
import { formQuery } from '../query'

export const FormDisplay = () => {
  const { procedureId } = useParams<{ procedureId: string }>();
  const [formVars, setFormVars] = useState<any>({ id: procedureId })
  const [form,] = useQuery({
    query: formQuery,
    variables: formVars
  })
  const { data, fetching, error } = form;
  console.log(fetching)
  console.log(data);
  if (fetching) return (<p>Loading...</p>);
  const assembledData = assemble(data.form);
  console.log(assembledData);
  return (
    <div>
      <h3>{assembledData.procedureId}</h3>
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

const renderSections = (sections: any) => {
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

const renderQuestions = (questions: any) => {
  return (
    <div>
      {questions.map((question: any) => {
        if (question === null || !question.isEnabled) return null;
        return (
          <div>
            <h4 className="blue-heading">{question.name}: {question.title} {question.mustImplement ? "*" : ""}</h4>
            {question.questionType === "text" ? (<input type="text"/>) : null}
            {question.questionType === "number" ? (<input type="number"></input>) : null}
            {question.questionType === "single choice" ? (
              question.response.choices.map((choice: any) => {
                return <p className="questionp"><input type="radio" name="q1" value="1"></input>{choice.name}: {choice.title}</p>;
              })
            ) : null}
            <p>{question.textAfterResponse}</p>
            {question.subQuestions ? renderQuestions(question.subQuestions) : null}
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

const renderProperties = (data: any) => {
  return (
    <div>
      <h5>Title: {data.title}</h5>
      <h6>Version: {data.lastModified}</h6>
      {/*<h5>Release Date: {(new Date(data.releaseDate)).toLocaleString()}</h5>*/}
      <h6>Lineage: {data.lineage}</h6>
      {data.patientId !== "template" ? <h5>Patient: {data.PatientId}</h5> : null}
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
  section.questions = [];
  return section;
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
