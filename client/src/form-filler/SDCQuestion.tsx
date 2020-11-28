import React from 'react';
import {TextInput, NumberInput, RadioButtonGroup, RadioButton, FormGroup} from 'carbon-components-react'
import { responsePathAsArray } from 'graphql';


export const SDCQuestion = ({questionID, formArray, setFormArray} : any) => {
const questionIndex=formArray.findIndex(((obj:any) => obj.id == questionID));
const question:any= formArray[questionIndex];
const inputArray = [...formArray]

if (question.superQuestionID != null) {
    const superIndex = formArray.findIndex(((obj:any) => obj.id == question.superQuestionID));
    if(formArray[superIndex].response.userInput == question.superAnswerID) {
        question.isEnabled = true;
    }else {
        question.isEnabled = false;
    }
}

const textProps = {
    id: question.id,
    labelText: question.title,
    onChange : (event:any)=>{
        const qIndex = formArray.findIndex(((obj:any) => obj.id == question.id));
        inputArray[qIndex].response.userInput = event.target.value
        setFormArray(inputArray)
    },
    // mustImplement:question.mustImplement ? true : false,
    disabled: question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name
}

const numProps = {
    id: question.id,
    //labeltext: question.title,
    onChange : (event:any)=>{
        const qIndex = formArray.findIndex(((obj:any) => obj.id == question.id));
        inputArray[qIndex].response.userInput = event.target.value
        setFormArray(inputArray)
    },
    // mustImplement:question.mustImplement ? true : false,
    min: 0,
    max: 9999999,
    value: 0,
    step: 1,
    disabled:question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name
}

const radioProps = {
    className:"radioWrap",
    onChange : (event:any)=>{
        const inputArray:any = [...formArray]
        const qIndex = inputArray.findIndex(((obj:any) => obj.id == question.id));
        if(inputArray[qIndex].response.userInput == event.target.value){
            inputArray[qIndex].response.userInput=''
        }
        else{inputArray[qIndex].response.userInput = event.target.value}
        setFormArray(inputArray)
    },
    name :question.name,
}
const radioButton ={
    className:"radioButton",
    disabled:question.isEnabled == null ? false : !question.isEnabled,    
    name:question.name
}
if (question.questionType == 'text') {
    return (
        <div className="SDCQuestion">
        {question.mustImplement ? "*" : null}
        {renderArbitraryQuestionProperties(question)}
        <TextInput {...textProps}/>
        </div>
      )
} else if (question.questionType == 'number') {
    return (
        <div className="SDCQuestion">
        {question.mustImplement ? "*" : null}
        {renderArbitraryQuestionProperties(question)}
        <NumberInput {...numProps}/>
        </div>
      )
} 
else if (question.questionType == 'single choice') {
    return (
        <div className="SDCQuestion">
        <FormGroup legendText={question.title? question.title : question.id}> {question.mustImplement ? "*" : null}
        {renderArbitraryQuestionProperties(question)}
        <div {...radioProps}>
            {question.response.choices.map((choice: any) => {
                let text = choice.title;
                if(question.arbitraryProperties) {
                    for(let [key, value] of question.arbitraryProperties.map((item: any) => Object.entries(item))){
                        if(Array.isArray(value) && value.length === question.response.choices.length) {
                            text = `${text}, ${JSON.stringify(key)}: ${JSON.stringify(value[question.response.choices.indexOf(choice)])}`;
                        }
                    }
                }
                return <RadioButton value={choice.ID} labelText={text} key={choice.name} {...radioButton} defaultChecked={question.response.userInput==choice.id? true:false}/> 
        })}
        </div>
        </FormGroup>
        </div>
      )
} 
else {
    return null;
}
};

const renderArbitraryQuestionProperties = (question: any) => {
    return (<div>
        {question.arbitraryProperties ? question.arbitraryProperties.map((item: any) => {
          item ? <div className="arbitraryQuestionProperties">{
            Object.entries(item).map((entry: any) => <h6 className="arbitraryQuestionProperty">{JSON.stringify(entry[0])}: {JSON.stringify(entry[1])}</h6>)
          }</div> : ""
        }) : ""}
    </div>);
}