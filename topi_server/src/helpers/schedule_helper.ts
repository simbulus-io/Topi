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

const createEvent = async (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

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
    db.collection('events')
    .deleteOne({ "id": req.body.id })
    .then(event => {
        return res.status(200).json({ event })
    })
    .catch(error => {
        return res.status(500).json({ msg: error.message })
    })
}

export default {
    getEvents,
    createEvent,
    deleteEvent,
}