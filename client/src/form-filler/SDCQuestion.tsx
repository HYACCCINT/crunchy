import React from 'react';
import {TextInput, NumberInput, RadioButtonGroup, RadioButton, FormGroup} from 'carbon-components-react'


export const SDCQuestion = ({question, formArray, setFormArray} : any) => {
console.log(question);
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
    mustImplement:question.mustImplement ? true : false,
    // defaultValue: question.response.userInput,
    disabled: question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name
}

const numProps = {
    id: question.id,
    labelText: question.title,
    onChange : (event:any)=>{
        const qIndex = formArray.findIndex(((obj:any) => obj.id == question.id));
        inputArray[qIndex].response.userInput = event.target.value
        setFormArray(inputArray)
    },
    mustImplement:question.mustImplement ? true : false,
    // defaultValue: question.response.userInput,
    min: 0,
    max: 9999999,
    value: 0,
    step: 1,
    disabled:question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name
}
const radioProps = {
    id: question.id,
    labelText: question.title,
    onChange : (event:any)=>{
        const qIndex = formArray.findIndex(((obj:any) => obj.id == question.id));
        inputArray[qIndex].response.userInput = event
        setFormArray(inputArray)
    },
    disabled:question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name,
    name :question.name,
    // defaultSelected:question.response.userInput
}
const radioButton ={
    disabled:question.isEnabled == null ? false : !question.isEnabled,
}
if (question.questionType == 'text') {
    return (
        <div className="SDCQuestion">
        <TextInput {...textProps}/>
        </div>
      )
} else if (question.questionType == 'number') {
    return (
        <div className="SDCQuestion">
        <NumberInput {...numProps}/>
        </div>
      )
} 
else if (question.questionType == 'single choice') {
    return (
        <div className="SDCQuestion">
        <FormGroup legendText={question.title? question.title : question.id}>
        <RadioButtonGroup {...radioProps}>
            {question.response.choices.map((choice: any) => {
                return <RadioButton value={choice.id} labelText={choice.title} key={choice.name} {...radioButton}/>
        })}
        </RadioButtonGroup>
        </FormGroup>
        </div>
      )
} 
else {
    return null;
}
};
