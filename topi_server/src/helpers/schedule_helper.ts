import { ObjectId } from 'bson';
import { Request, Response, NextFunction } from 'express';
import { toArray } from 'lodash';
import { MongoDBs } from './mongo_helper';

const getEvents = async (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // find all events & return
    db.collection('events')
    .find()
    .toArray(function (err, events) {
        res.send(events)
    })
}

const getUserEvents = async (req: Request, res: Response) => {

     // connect to mongo
     const mongo: MongoDBs = req.app.get('mongo');
     const db = mongo.topi_db;

    // grab user id
    let { email } = req.body
    console.log('email')
    
    // find user's events and return (TODO)
    let toSend = []
    db.collection('users')
    .findOne({ email })
    .then(user => {
        toSend = user.userEvents
        console.log(toSend)
        return toSend
    })
    .catch(error => {
        return res.json({error: error.message})
    })
}


// TODO - Need to be able to grab some sort of info. that links a DB doc. to a 
// user, then insert a new event into their userEvent array
const createUserEvent = async (req: Request, res: Response) => {
    
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // take data from request
    let { email, date, info } = req.body
    console.log(email, date, info)

    // create obj. to add 
    const update = {
        email: email,
        date: date,
        info: info,
    }

    // update user events using the 'update' obj.
    db.collection('users').updateOne(
        { email: email },
        { $push: { userEvents: { update }}}
    )
    

    // db.collection('users').findOne({ email })
    // .then(user => {
    //     return res.json({ user: user })
    // })
    // .catch(error => {
    //     return res.json({ error: error.message})
    // })


    // TODO - insert new event/meeting into user's info.
    // db.collection('events')
    // .insertOne({ update })
    // .catch(error => {
    //     return res.json({ error: error.message })
    // })

}


const createEvent = async (req: Request, res: Response) => {
    console.log("here")
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;
    console.log('test for createEvent()')

    // create new event
    let { date, info } = req.body;

    // insert into mongo
    db.collection('events').insertOne({
        date: date,
        info: info,
    }, function (
        error,
        events,
    ) {
        res.json(events)
    })
}

// TODO - need to be able to delete events by either getting the
// id of the event or by finding the user then finding the event.
// ISSUE - id is passed to here (as seen byconsole.log) but won't
// delete an event 
const deleteEvent = async (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // delete event corresponding to _id
    let id = req.body.id
    console.log(`TEST: ${id}`)
    db.collection('events')
    .deleteOne({
        _id: id
    })
    .catch(error => {
        return { error: error.message }
    })
    res.send({ "Message" : "Possibly deleted one" })
}

export default {
    getEvents,
    createEvent,
    deleteEvent,
    getUserEvents,
    createUserEvent,
}