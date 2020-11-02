import { createClient, CombinedError } from 'urql';

export const formQuery = `
query($id: String!) {
	form(id: $id) {
		id,
		docType,
		procedureID,
		patientID,
		lineage,
		title,
		sections {
			id,
			docType,
			name,
			title,
			type,
			mustImplement,
			minCard,
			maxCard,
			questions {
				id,
				docType,
				name,
				title,
				mustImplement,
				readOnly,
				minCard,
				maxCard,
				maxSelections,
				questionType,
				isEnabled,
				textAfterResponse,
				superQuestionID,
				subQuestions
			},
			subSections
		},
		uri,
		footer,
            	lastModified
	}
}
`;

export const questionQuery = `
query($id: String!) {
	question(id: $id) {
		id,
		docType,
		name,
		title,
		mustImplement,
		readOnly,
		minCard,
		maxCard,
		maxSelections,
		questionType,
		isEnabled,
		textAfterResponse,
		superQuestionID,
		subQuestions
	}
}
`;

export const sectionQuery = `
query($id: String!) {
	section(id: $id) {
		id,
		docType,
		name,
		title,
		type,
		mustImplement,
		minCard,
		maxCard,
		questions {
			id,
			docType,
			name,
			title,
			mustImplement,
			readOnly,
			minCard,
			maxCard,
			maxSelections,
			questionType,
			isEnabled,
			textAfterResponse,
			superQuestionID,
			subQuestions
		},
		subSections
	}
}
`;

export const deleteFormQuery = `
mutation($id: String) {
	deleteForm(id: $id) {
		id
	}
}
`;

export const updateFormQuery = `
mutation($id: String, $input: FormInput) {
	updateForm(id: $id, input: $input) {
		id,
		docType,
		procedureID,
		patientID,
		lineage,
		title,
		sections {
			id,
			docType,
			name,
			title,
			type,
			mustImplement,
			minCard,
			maxCard,
			questions {
				id,
				docType,
				name,
				title,
				mustImplement,
				readOnly,
				minCard,
				maxCard,
				maxSelections,
				questionType,
				isEnabled,
				textAfterResponse,
				superQuestionID,
				subQuestions
			},
			subSections
		},
		uri,
		footer,
            	lastModified
	}
}
`;

export const updateQuestionQuery = `
mutation($id: String, $input: SDCQuestionInput) {
	updateQuestion(id: $id, input: $input) {
		id,
		docType,
		name,
		title,
		mustImplement,
		readOnly,
		minCard,
		maxCard,
		maxSelections,
		questionType,
		isEnabled,
		textAfterResponse,
		superQuestionID,
		subQuestions
	}
}
`;

export const updateSectionQuery = `
mutation($id: String, $input: SDCSectionInput) {
	updateSection(id: $id, input: $input) {
		id,
		docType,
		name,
		title,
		type,
		mustImplement,
		minCard,
		maxCard,
		questions {
			id,
			docType,
			name,
			title,
			mustImplement,
			readOnly,
			minCard,
			maxCard,
			maxSelections,
			questionType,
			isEnabled,
			textAfterResponse,
			superQuestionID,
			subQuestions
		},
		subSections
	}
}
`;

export const urqlClient = createClient({
	url: `http://localhost:5000/graphql`
});

export const handleUrqlError = (error: CombinedError | undefined) => {
	if (error) {
		for (const { message } of error.graphQLErrors) {
			throw new Error(message);
		}
	}
};
