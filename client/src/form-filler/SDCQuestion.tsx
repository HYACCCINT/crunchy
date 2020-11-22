import React from 'react';
import {TextInput, NumberInput, RadioButtonGroup, RadioButton, FormGroup} from 'carbon-components-react'


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
    mustImplement:question.mustImplement ? true : false,

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
    min: 0,
    max: 9999999,
    value: 0,
    step: 1,
    disabled:question.isEnabled == null ? false : !question.isEnabled,
    helperText: question.name
}

const radioProps = {
    className:"radioWrap",
    labelText: question.title,
    onChange : (event:any)=>{
        const inputArray:any = [...formArray]
        const qIndex = inputArray.findIndex(((obj:any) => obj.id == question.id));
        if(inputArray[qIndex].response.userInput == event.target.value){
            inputArray[qIndex].response.userInput=''
        }
        else{inputArray[qIndex].response.userInput = event.target.value}
        setFormArray(inputArray)
    },
    helperText: question.name,
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
        <div {...radioProps}>
            {question.response.choices.map((choice: any) => {
                return <RadioButton value={choice.ID} labelText={choice.title} key={choice.name} {...radioButton} defaultChecked={question.response.userInput==choice.id? true:false}/> 
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
