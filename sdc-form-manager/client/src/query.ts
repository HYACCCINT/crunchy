import { createClient, CombinedError } from 'urql';

export const formQuery = `
query($id: String!) {
	form(id: $id) {
		id
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
		id
	}
}
`;

export const urqlClient = createClient({
	//!!!!!!!!!!!!!!!!!
	url: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
	fetchOptions: () => ({ credentials: 'include' })
});

export const handleUrqlError = (error: CombinedError | undefined) => {
	if (error) {
		for (const { message } of error.graphQLErrors) {
			throw new Error(message);
		}
	}
};