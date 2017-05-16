const express = require('express');
const bodyParser = require('body-parser');

const eventModel = require('../model/events.js');

const router = express.Router();

router.use(bodyParser.json());

//list
router.get('/events',function(req,res,next) {
	console.log('in event.js/router.get');
	console.log(req.query.searchText);
	console.log(req.query.accomplishTodo);
	console.log(req.query.showDays);
	console.log(req.query.accountName);
	eventModel.listEvents(
		req.query.searchText,
		req.query.accomplishTodo,
		req.query.showDays,
		req.query.accountName)
	.then(events => {
		res.json(events);
	}).catch(next);
});

//create

router.post('/events',function(req,res,next) {
	console.log('in event.js/router.post');
	const {eventTitle,eventStartDate,eventEndDate,eventDescript,accountName} = req.body;
	if (!eventTitle || ! eventStartDate || !eventEndDate || !eventDescript || !accountName) {
		console.log(accountName);
		const err = new Error('Data incomplete');
		err.status = 400;
		throw err;
	}
	eventModel.createEvent(eventTitle,eventStartDate,eventEndDate,eventDescript,accountName).then(events => {
		console.log('event created:' , events);
		res.json(events);
	}).catch(next);
});
//accomplishEvent
router.post('/events/:id', function(req, res, next) {
    const {id} = req.params;
		// console.log('Router.eventjs.accomplishEvent : ', id);
    if (!id) {
        const err = new Error('Id not received');
        err.status = 400;
        throw err;
    }
    eventModel.accomplishEvent(id).then(events => {
		console.log('enter eventModel: accomplishEvent');
        res.json(events);
    }).catch(next);
});

//create account
router.post('/user',function(req,res,next) {
	const {account,password} = req.body;
	console.log('account received', account);
	console.log('key received', password);
	if (!account || !password) {
		const err = new Error('date received wrong');
		err.status = 400;
		throw err;
	}
	eventModel.createAccount(account, password).then((status) => {
		console.log('data get in createAccount :', status);
		res.json(status);
	}).catch(next);
})
module.exports = router;
