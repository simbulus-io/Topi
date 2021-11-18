import { ObjectId } from 'bson';
import { Request, Response, NextFunction } from 'express';
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

    // find user's events and return (TODO)
    db.collection('events')
    .findOne({ email })
    .then(user => {
        // return res.json({user: user})
        return res.json({ events: user.userEvents })
    })
    .catch(error => {
        return res.json({error: error.message})
    })
}

const createUserEvent = async (req: Request, res: Response) => {
    
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // take data from request
    let { email, date, info } = req.body
    const update = {
        email: email,
        date: date,
        info: info,
    }

    // TODO - insert new event/meeting into user's info.
    db.collection('events')
    .insertOne({ update })
    .catch(error => {
        return res.json({ error: error.message })
    })

}


const createEvent = async (req: Request, res: Response) => {

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