require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT;


app.use(logger);
app.use(helmet());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

require('./config/mongoose.config');
require('./config/twilio.config');

app.use('/admin', require('./routes/admin.routes'));
app.use('/content', require('./routes/content.routes'));
app.use('/user',  require('./routes/user.routes'));
app.use('/sms', require('./routes/message.routes'));

const server = require('http').createServer(app);

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}.`)
});