const { buildSchema } = require('graphql');

export const schema = buildSchema(`
	scalar DataSetValue
	scalar Contact
	scalar MultipleChoice
    scalar UserResponse
	interface SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
	}
	type SDCMultipleChoiceResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		userInput: [String]
		choices: [MultipleChoice]
		canMultiSelect: Boolean
	}
	type SDCTextResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		userInput: String
		defaultValue: String
	}
	type SDCIntResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		userInput: Int
		defaultValue: Int
	}
    type SDCQuestion {
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
		response: SDCQuestionResponse
		textAfterResponse: String
		subQuestions: [SDCQuestion]
		superSectionID: String
		superQuestionID: String
		superAnswerID: String
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
		subSectionIDs: [String]
		superSectionID: String
	}
	type SDCForm {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title:String
		uri: String
		sectionIDs: [String]
		footer: String
		xml: String
        lastModified: String
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
		subQuestions: [SDCQuestionInput]
		superSectionID: String
		superQuestionID: String
		superAnswerID: String
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
		superSectionID: String
	}
	input FormInput {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title:String
		uri: String
		sectionIDs: [String]
		footer: String
        lastModified: String
	}
	input FormXMLInput {
		id: String
		xml: String
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

	union SDCFormObjects = SDCForm | SDCSection | SDCQuestion
	union SDCSectionObjects = SDCSection | SDCQuestion

	type Query {
		forms(limit: Int, skip: Int, id: String): [SDCForm]
		form(id:String): [SDCFormObjects]
		question(id:String): [SDCQuestion]
		section(id:String): [SDCSectionObjects]
	}
	type Mutation {
		updateForm(id: String, input: FormInput): SDCForm
		uploadForm(id: String, input: FormXMLInput): SDCForm
		updateQuestion(id: String, input: SDCQuestionInput): SDCQuestion
		updateSection(id: String, input: SDCSectionInput): SDCSection
		deleteForm(id: String): SDCForm
		updateRes(id: String, input:UserResponse): SDCForm
	}
`);

export const resolveType = (obj: any, context: any, info: any): string => {
	if(obj.docType) {
		return obj.docType;
	}
	else if(obj.responseType && obj.responseType.includes("single choice")) return "SDCMultipleChoiceResponse";
	else if(obj.responseType === "text") return "SDCTextResponse";
	else if(obj.responseType === "num") return "SDCIntResponse";
	else {
		return null;
	}
}