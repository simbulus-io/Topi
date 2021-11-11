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
    let { id } = req.body
    console.log(id)
    db.collection('user')
    .find({ _id: id })
    .toArray(function (err, user) {
        res.send(user)
    })
}

const createUserEvent = async (req: Request, res: Response) => {
    
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    let { nInfo, nDate } = req.body

    // then off of stored user -> append new event to user current events
    // vuex ?
    // update in proxy server
}

const createEvent = async (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;
    console.log('test for createEvent()')
    // create new event
    let { date, info } = req.body;
    console.log(date)
    console.log(info)
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
    console.log(req.body.id)
    db.collection('events').deleteOne({ '_id': req.body.id })
    
    .catch(error => {
        return res.status(500).json({ msg: error.message })
    })
}

export default {
    getEvents,
    createEvent,
    deleteEvent,
}