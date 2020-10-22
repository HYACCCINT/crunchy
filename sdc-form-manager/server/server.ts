import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { root, schema } from './graphql';
import { router } from './rest';
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}));
app.use('/', router);

app.get('/api/form', async(req: any, res: any) => {
	try {
		const form = await root.form({ id: req.params.id }, req);
		res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.get('/SDC_Form', async (req, res, next) => {
  const procedureID = req.query.procedureID;
  if(!procedureID){
    next(new Error("procedureID did not show in parameters"));
  }
  const form = { formID: procedureID, attributes: "Blahblah" }; //do call for database function here
  res.send(form);
});

app.post('/SDC_Form', async (req, res, next) => {
  console.log(req.body);
  const procedureID = req.query.procedureID;
  if(!req.body){
    next(new Error("No XML Form in body"));
  }
  if(procedureID /* is in database */){
    //set the form version on the database and change the id possibly?
  }
  //const formJSON = parseXMLSomehow(req.body);
  //put formJSON into database;
  res.send({
    status: "blah blah",
    somethingsomething: "Blah",
  });
})

app.delete('/SDC_Form', async (req, res, next) => {
  const procedureID = req.query.procedureID;
  if(!procedureID){
    next(new Error("procedureID did not show in parameters"));
  }
  //find form with procedureID in database and delete it
  res.send("DELETED");
})

//default routes to test functionality. delete when done with
app.get('/test', (req, res) => {
    res.send('Welcome to the backend!');
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));