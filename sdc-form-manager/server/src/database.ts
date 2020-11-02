import Cloudant from '@cloudant/cloudant';
import { readFileSync, readdirSync } from 'fs';


const usage = () => {
	console.log(`DB username/apikey not setup properly`);
	process.exit(1);
};

class Database {
	name: string;

	cloudant: Cloudant.ServerScope;
	db: Cloudant.DocumentScope<any> | any;
	initialized = false;

	constructor(name = 'crunchy') {
		this.name = name;

		// Below is for production environment
		// if (!process.env.CLOUDANT_USERNAME || !process.env.CLOUDANT_KEY) {
		// 	usage();
		// }

		// this.cloudant = Cloudant({
		// 	account: process.env.CLOUDANT_USERNAME,
		// 	plugins: {
		// 		iamauth: { // eslint-disable-next-line object-curly-newline
		// 			iamApiKey: process.env.CLOUDANT_KEY
		// 		}
		// 	}
		// });


		// This would be http://USERNAME:PASSWORD@localhost:5984, modify as needed
		this.cloudant = Cloudant('http://admin:crunchy@localhost:5984');

		this.cloudant.db.list().then((body: any) => {
			// create db if it doesn't exist, otherwise just use it
			if (!body.includes(this.name)) {
				this.cloudant.db.create(this.name).then(() => {
					this.use();
					this.initializeViews();
				});
			} else {
				this.use();
			}
		});
	}

	use(name: string = this.name) {
		this.name = name;
		this.db = this.cloudant.use(this.name);
		this.initialized = true;
	}



	/**
	 * Fetches the item from the database or throws error.
	 * The error thrown might be surfaced in graphql.
	 *
	 * @param id identifier
	 * @param req http request received through express, contains info on authenticated user
	 */
	async get<T = object>(id: string, req?: any) {
		const item = await this.db.get(id);

		return item;
	}


	insert<T = object>(id: any, value: any = undefined) {
		return this.db.insert(value, id);
	}

	/**
	 * Inserts or updates the item to the database or throws error.
	 * The error thrown might be surfaced in graphql.
	 *
	 * @param id identifier
	 * @param req http request received through express, contains info on authenticated user
	 */
	// eslint-disable-next-line
	async upsert<T = object>(id: string, value: any, req?: any) {
		console.log("dsfsdhugfbsiudhfsaaaaa", id)
		let v = {};
		try {
			v = await this.get(id);
		} catch (exception) {
			if (exception.statusCode !== 404) {
				// 404 is ok, just means item is not yet in db and we have to insert it
				// for the first time
				// We log everything else
				console.error(exception);
				throw exception;
			}
		}
		return this.insert(id, Object.assign(v, value));

	}



	async delete<T = object>(id: string, req?: any) {
		let docObj;
		try {
			docObj = await this.db.get(id);
		} catch (exception) {
			console.error(exception);
			throw exception;
		}
		return await this.db.destroy(docObj._id, docObj._rev);
	}

	async getForm(id: string, req: any) {
		const item = await this.get(id, req)
			.then((form: any) => { form.id = id; return form; });

		if (item.type !== 'form' && item.docType !== 'SDCForm') {
			return null;
		}

		return item;
	}

	async getQuestion(id: string, req: any) {
		const item = await this.get(id, req)
			.then((question: any) => { question.id = id; return question; });

		if (item.docType !== 'SDCQuestion') {
			return null;
		}

		return item;
	}

	async getSection(id: string, req: any) {
		const item = await this.get(id, req)
			.then((section: any) => { section.id = id; return section; });

		if (item.docType !== 'SDCSection') {
			return null;
		}

		return item;
	}

	async updateForm<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		value.docType = 'SDCForm';
		return await this.upsert(id, value, req);
	}

	async updateQuestion<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		value.docType = 'SDCQuestion';
		return await this.upsert(id, value, req);
	}

	async updateSection<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		value.docType = 'SDCSection';
		return await this.upsert(id, value, req);
	}

	async deleteForm<T = object>(id: any, req: any) {
		let formObj;
		try {
			formObj = await this.db.get(id);
		} catch (exception) {
			console.error(exception);
			throw exception;
		}
		if (!formObj || formObj.type !== 'form') {
			throw 'Item not found';
		}
		return this.delete(formObj.id, req);
	}

	initializeViews(folderName = 'db-views') {
		// `db-views` folder structure
		// db-views/
		// └── designdoc1
		//     ├── view-name-1.map.js
		//     ├── view-name-1.reduce.js
		//     ├── view-name-2.map.js
		//     └── view-name-2.reduce.js
		// └── designdoc2
		//     ├── view-name-1.map.js
		//     ├── view-name-1.reduce.js
		//     ├── view-name-2.map.js
		//     └── view-name-2.reduce.js

		// we want all the views to be initialized before we start using db so we use sync
		readdirSync(folderName, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.forEach((designDocument) => {
				const documentFolderPath = `${folderName}/${designDocument.name}`;
				const views: any = {};

				readdirSync(documentFolderPath, { withFileTypes: true })
					.filter((entry) => entry.isFile())
					.forEach((file) => {
						const viewPath = `${documentFolderPath}/${file.name}`;
						const parts = file.name.split('.');

						if (parts.length < 3) { // doesn't look like a legitimate view function
							return;
						}

						// in case there are `.`s in the actual view name
						const viewName = parts.slice(0, parts.length - 2).join('.');

						if (parts[parts.length - 2] === 'map' || parts[parts.length - 2] === 'reduce') {
							const viewContent = readFileSync(viewPath, 'utf8');
							// if view_name not in views:
							if (!Object.keys(views).includes(parts[parts.length - 2])) {
								views[viewName] = { [parts[parts.length - 2]]: viewContent };
							} else {
								views[viewName][parts[parts.length - 2]] = viewContent;
							}
						}
					});

				this.db.insert({ views }, `_design/${designDocument.name}`);
			});
	}

}

export const database = new Database();
