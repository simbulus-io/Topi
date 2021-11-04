import { Request, Response, NextFunction } from 'express';
import { last } from 'lodash';
import { error } from 'winston';
import { MongoDBs } from '../helpers/mongo_helper';


const login = async (req: Request, res: Response, next: NextFunction) => {
    
    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // set email & pw, then find corresponding pw & match
    let { email, password } = req.body;

    // debug
    console.log(`[DEBUG] - Email: ${email}`)
    console.log(`[DEBUG] - Password: ${password}`)

    // grab user db
    db.collection('users')
    .findOne({ email })
    .then(user => {

        // debug
        console.log(`[DEBUG] - User: ${user}`)

        // "validate"
        if (user.password === password) {
            return res.status(200).json({ user })
        } else {
            return res.send('Incorrect email/password information!')
        }
    })

    // catch any errors (403)
    .catch (error => {
        return res.status(403).json({ err: error, msg: error.message, input: email, input2: password })
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

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // return all users in db
    db.collection('users')
    .find()
    .toArray(function (err, users) {
        res.send(users)
    })
}


// need to delete user
const deleteUser = (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // find user off of _id & delete
    db.collection('users')
    .deleteOne({ "id" : req.body.id })
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