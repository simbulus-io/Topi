import { Request, Response, NextFunction } from 'express';
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
    db.collection('users').findOne({ email })
    .then(user => {
        if (user == null) {
            return res.status(403).send(null)
        }
        // "validate"
        if (user.password === password) {
            console.log('Valid password')
            return res.status(200).json({ user })
        } else {
            return res.status(403).send(null)
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
        password: password,
        userEvents: [],
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
const deleteUser = async (req: Request, res: Response) => {

    // connect to mongo
    const mongo: MongoDBs = req.app.get('mongo');
    const db = mongo.topi_db;

    // let { _id } = req.body
    // For some reason - having issues with deleting users based on _id filter
    db.collection('users')
    .findOneAndDelete({})
    .then(res => {
        return res
    })


    // db.collection('users')
    // .deleteMany({ _id: req.body })
    // .then(res => {
    //     return res
    // })
    // .catch(error => {
    //     return res.status(500).json({msg: error.message})
    // })
    // // // find user off of _id & delete
    // // db.collection('users')
    // // .find({ id })
    // // .deleteOne({ id })
    // // .then(user => {
    // //     return res.status(200).json({ user })
    // // })
    // // .catch(error => {
    // //     return res.status(500).json({ msg: error.message })
    // // })
}

export default {
    login,
    register,
    getInfo,
    deleteUser
}