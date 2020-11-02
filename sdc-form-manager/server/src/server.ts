import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { root, schema } from './graphql';
import { router } from './rest';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;
// cors temp
app.use(cors())
app.use(cors({
  credentials: true,
  //to be changed in production
	origin: [ 'http://localhost:5000']
}))

//db api
app.use('/graphql',cors(), graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}));
app.use('/', router);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/apitest/form', async(req: any, res: any) => {
	try {
    const form = await root.form({ id: req.body.id }, req);
    res.json(form)
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.post('/api/form', async(req: any, res: any) => {
	try {
		const form = await root.updateForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});



const server = app.listen(port, () => console.log(`Listening on port ${port}`));
export default server;
