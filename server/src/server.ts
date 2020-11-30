import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { root, schema, resolveType } from './graphql';
import { router } from './rest';
import cors from 'cors';
const session = require('express-session');
const cookieParser = require('cookie-parser');

const guestUser = {
	id: 'guest',
	docType: 'user',
	permissions:['read']
};

const app = express();
const port = process.env.PORT || 5000;
// cors temp
app.use(cors())
app.use(cors({
  credentials: true,
  //to be changed in production
	origin: [ 'http://localhost:5000', 'http://localhost:3000']
}))

app.use(cookieParser());

// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
	secret: '123456',
	resave: true,
	saveUninitialized: true
}));

/**
 * If guest user is logged in, here is where it becomes an object on req.
 */
app.use('*', (req: any, res: any, next: any) => {
	if (req.session && req.session.user && !req.user) {
		// We're a guest user now!
		req.user = res.user;
	}
	next();
});

//db api
app.use(bodyParser.json({ limit: '1mb' }));
app.use('/graphql',cors(), graphqlHTTP({
	schema,
	typeResolver: resolveType,
	rootValue: root,
	graphiql: true
}));
app.use('/', router);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
function checkAuthentication(req: any, res: any, next: any) {
try {
		next();
	} catch (error){
		res.status('401').json({ error: 'unauthorized' });
	}
}

app.get('/api/guest-login', async(req: any, res: any) => {
	req.session.user = guestUser;
	res.redirect("localhost:3000/dashboard");
});

app.get('/api/user', checkAuthentication, async(req: any, res: any) => {
	try {
		const user = guestUser;
		res.json(user);
	} catch (error) {
		res.status('404').json({ error: 'User not found' });
	}
});

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

app.post('/api/upload/form', async(req: any, res: any) => {
	try {
		const form = await root.uploadForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
export default server;
