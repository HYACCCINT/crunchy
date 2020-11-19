import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { root, schema, resolveType } from './graphql';
import { router } from './rest';
import { users, findUser, bothManagerFiller, onlyManager, onlyFiller } from './users';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;
const secret = 'myauthenticationsecret';
app.use(cookieParser());

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//authentication routes
app.post('/authenticate', (req, res) => {
	const { email, password } = req.body;
	const userType = findUser(email, password);
	if(userType === 'not found'){
		res.status(401).json({ error: 'Incorrect email or password' });
	}
	else {
		// Issue token
		const payload = { email, userType };
		const token = jwt.sign(payload, secret, { expiresIn: '1h' });
		res.cookie('sdc-tools-token', token, { httpOnly: true }).sendStatus(200);
	}
})

app.get('/checkToken', (req, res) => {
	res.sendStatus(200);
})

//authentication middleware
const authMiddleware = () => {
	return (req: any, res: any, next: any) => {
		const token = req.cookies.token;
		if (!token) {
			res.status(401).send('Unauthorized: No token provided');
		} else {
			jwt.verify(token, secret, function (err: any, decoded: any) {
				if (err) {
					res.status(401).send('Unauthorized: Invalid token');
				}
				else {
					req.email = decoded.email;
					req.userType = decoded.userType;
					next();
				}
			});
		}
	}
}
app.use(authMiddleware());

app.get('/apitest/form', async(req: any, res: any) => {
	if(!bothManagerFiller.includes(req.userType)) {
		res.status('401').json({ error: 'Incorrect User' });
		return;
	}
	try {
    const form = await root.form({ id: req.body.id }, req);
    res.json(form)
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.post('/api/form', async(req: any, res: any) => {
	if(!onlyFiller.includes(req.userType)) {
		res.status('401').json({ error: 'Incorrect User' });
		return;
	}
	try {
		const form = await root.updateForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.post('/api/upload/form', async(req: any, res: any) => {
	if(!onlyManager.includes(req.userType)) {
		res.status('401').json({ error: 'Incorrect User' });
		return;
	}
	try {
		const form = await root.uploadForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
export default server;
