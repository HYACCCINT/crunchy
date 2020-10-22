const { buildSchema } = require('graphql');

export const schema = buildSchema(`
	scalar DataSetValue
    
    type SDCQuestion {
		id: String
	}

	type SDCForm {
		id: String
        lastModified: String
        procedureID: String
        questions: [SDCQuestion]
    }

	input FormInput {
		id: String
        lastModified: String
        procedureID: String
        questions: [SDCQuestionInput]
	}

	input questionInput {
		id: String
	}

	type Query {
        form(id:String): SDCForm
	}

	type Mutation {
		updateForm(id: String, input: FormInput): SDCForm
		deleteForm(id: String): SDCForm
	}
`);
