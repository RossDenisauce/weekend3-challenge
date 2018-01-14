const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

const tasksRouter = require('./routes/tasks.router');

app.use('/tasks', tasksRouter);

app.listen(port, function(){
    console.log('listening on port:', port);
});