import * as path from "path";

require('source-map-support').install();

import express = require('express');
import * as bodyParser from 'body-parser';
import {HomeController} from "./src/controller/HomeController";
import {ApiController, Dino} from "dinoloop";
import * as os from "os";
import {Container, decorate, injectable} from 'inversify';

decorate(injectable(), ApiController);

const app = express();
app.use(bodyParser.json());
app.use(express.static('public/build'));

// Dino requires express instance and base-uri to which dino will be mounted
const dino = new Dino(app, '');

// Dino requires express router too
dino.useRouter(() => express.Router());

// Register controller
dino.registerController(HomeController);

const container = new Container();
container.bind(HomeController).toSelf();

dino.dependencyResolver<Container>(container,
	(injector, type) => {
		return injector.resolve(type);
	});

// Bind dino to express
dino.bind();

// view engine setup
app.engine('art', require('express-art-template'));
app.set('view', {
	debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'public/public'));
app.set('view engine', 'art');

// Start your express app
const host = os.hostname();
const port = process.env.PORT || 8088;
app.listen(port, () => console.log(`Server started on http://${host}:8088`));
