const { buildSchema } = require('graphql');

export const schema = buildSchema(`
	scalar DataSetValue
	scalar Contact
	scalar MultipleChoice
    
    interface SDCQuestion {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		superQuestionID: String
		subQuestions: [String]
	}
	type SDCMultipleChoice implements SDCQuestion {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		superQuestionID: String
		subQuestions: [String]
		choices: [MultipleChoice]
		canMultiSelect: Boolean
	}
	type SDCTextQuestion implements SDCQuestion {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		superQuestionID: String
		subQuestions: [String]
		defaultValue: String
	}
	type SDCIntQuestion implements SDCQuestion {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		superQuestionID: String
		subQuestions: [String]
		defaultValue: Int
	}
	type SDCSection {
		id: String
		docType: String
		name: String
		title: String
		type: String
		mustImplement: Boolean
		minCard: Int
		maxCard: Int
		questions: [SDCQuestion]
		subSections: [String]
	}
	type SDCForm {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title:String
		uri: String
		sections: [String]
		footer: String
		xml: String
        lastModified: String
	}
	type SDCQuestionResponse {
		id: String
		questionID: String
		userInput: [String]
	}
	
	type SDCFormResponse {
		id: String
		docType: String
		formID: String
		formFillerID: String
		patientID: String
		responses: [SDCQuestionResponse]
	}
	input SDCQuestionInput {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		superQuestionID: String
		subQuestions: [String]
	}	
	input SDCSectionInput {
		id: String
		docType: String
		name: String
		title: String
		type: String
		mustImplement: Boolean
		minCard: Int
		maxCard: Int
		questions: [SDCQuestionInput]
		subSections: [String]
	}
	input FormInput {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title: String
		uri: String
		sections: [String]
		footer: String
        lastModified: String
	}
	input SDCQuestionResponseInput {
		id: String
		questionID: String
		userInput: [String]
	}
	input SDCFormResponseInput {
		id: String
		docType: String
		formID: String
		formFillerID: String
		patientID: String
		responses: [SDCQuestionResponseInput]
	}
	type Query {
		form(id:String): SDCForm
		question(id:String): SDCQuestion
		section(id:String): SDCSection
	}
	type Mutation {
		updateForm(id: String, input: FormInput): SDCForm
		updateQuestion(id: String, input: SDCQuestionInput): SDCQuestion
		updateSection(id: String, input: SDCSectionInput): SDCSection
		deleteForm(id: String): SDCForm
	}
`);
