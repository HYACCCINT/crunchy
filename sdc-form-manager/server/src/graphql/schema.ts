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
		sections: [SDCSection]
		footer: String
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
		sections: [SDCSectionInput]
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
	}
	type Mutation {
		updateForm(id: String, input: FormInput): SDCForm
		deleteForm(id: String): SDCForm
	}
`);