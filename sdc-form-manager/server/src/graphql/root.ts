import { database } from '../database';

// graphql root
export const root = {
	form: async({ id }: { id: string }, context: any) => {
		try {
			const form: any = await database.getForm(id, context);
			form.id = id;
			return form;
		} catch (error) {
			console.error('get form error:', error);
			throw error;
		}
	},
	updateForm: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.updateForm(id, input, context);
			return await root.form({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('update form error:', error);
			throw error;
		}
	},
	deleteForm: async({ id }: {id: string}, context: any) => {
		try {
			return await database.deleteForm(id, context);
		} catch (error) {
			console.error('delete form error:', error);
			throw error;
		}
	}
};
