import { Request, Response, NextFunction } from 'express';
import { last } from 'lodash';
import { error } from 'winston';
import { MongoDBs } from '../helpers/mongo_helper';


const login = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    const mongo: MongoDBs = req.app.get('mongo');
}


// create new user
const register = async (req: Request, res: Response, next: NextFunction) => {
    
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;
    let collections = await db.listCollections().toArray()


    // grab new user info.
    let { firstName, lastName, email, password } = req.body;

    // insert user into db
    db.collection('users').insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }, function (
        error,
        users,
    ) {
        res.json(users)
    })
   
}

const getInfo = async (req: Request, res: Response, next: NextFunction) => {
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    db.collection('users')
    .find()
    .toArray(function (err, users) {
        res.send(users)
    })
    
}

export default {
    login,
    register,
    getInfo,
}