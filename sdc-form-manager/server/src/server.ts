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
// app.use(cors({
//   credentials: true,
//   //to be changed in production
// 	origin: [ 'http://localhost:5000']
// }))

//db api
app.use('/graphql',cors(), graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}));
app.use('/', router);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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