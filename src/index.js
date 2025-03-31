import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cookieParser  from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import homeRouter from './routes/homeRoutes.js';
import {errorHandler, notFound} from './middlewares/errorHandler.js';
import flashMiddleware from './middlewares/flashesMiddleware.js';
import { csrfMiddlewere } from './middlewares/csrfMiddlewere.js';
import methodOverride from './middlewares/methodOverride.js';






//Init app
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware to parse JSON and url = encode data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Use cookies-parser middlewere
app.use(cookieParser());

// Method override middlewere
app.use(methodOverride)

// Session middlewere
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));


// Flask middlewere
app.use(flashMiddleware);

// CsrfToken middlewere
app.use(csrfMiddlewere);

// Template engine

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.locals.basedir = `${__dirname}/views`;


// Public  file
app.use(express.static(`${__dirname}/public`));
app.use('/icons', express.static(`${__dirname}/../node_modules/bootstrap-icons/font`));



// Router 
app.use('/', homeRouter);

// Manejo De Errores
app.use(notFound);
app.use(errorHandler);


// Generate port

app.set('port', process.env.PORT );
app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});