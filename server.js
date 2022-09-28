require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 5002;

app.use(logger);
app.use(helmet({noSniff: false, contentSecurityPolicy: {directives: {'img-src': ["'self'", 'purecatamphetamine.github.io', 'www.w3.org']}}}));
app.use(morgan('tiny'));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorHandler);

require('./config/mongoose.config');
require('./config/twilio.config');

app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/content', require('./routes/content.routes'));
app.use('/api/user',  require('./routes/user.routes'));
app.use('/api/sms', require('./routes/message.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, './client/build', 'index.html', ));
    })
}

const server = require('http').createServer(app);

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}.`)
});