import { Request, Response, NextFunction } from 'express';
import { last } from 'lodash';
import { error } from 'winston';
import { MongoDBs } from '../helpers/mongo_helper';


// login 
const login = (req: Request, res: Response, next: NextFunction) => {
    
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    let { email, password } = req.body;
    db.collection('users')
    .findOne({ email })
    .then(user => {
        if (user.password == password) {
            return res.status(200).json({ user })
        }
    })
    .catch (error => {
        return res.status(403).json({ err: error, msg: error.message })
    })
}


// create new user
const register = async (req: Request, res: Response, next: NextFunction) => {
    
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

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


// returns all users info - for testing mainly
const getInfo = async (req: Request, res: Response, next: NextFunction) => {
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    db.collection('users')
    .find()
    .toArray(function (err, users) {
        res.send(users)
    })
}


// need to delete user
const deleteUser = (req: Request, res: Response) => {
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    db.collection('users')
    .deleteOne({ _id: req.params.id })
    .then(user => {
        return res.status(200).json({ user })
    })
    .catch(error => {
        return res.status(500).json({ msg: error.message })
    })
}

export default {
    login,
    register,
    getInfo,
    deleteUser
}