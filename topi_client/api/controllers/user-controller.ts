import { Request, Response, NextFunction} from 'express';
import log from '../config/log';
import UserSchema from '../model/user-model';
import mongoose from 'mongoose';

const namespace = 'USER-CONTROLLER';

/**
 * Login func. matches given email, and matches that email's corresponding
 * password to the inputted value. 
 * Right now it just returns the user's name when there is a match - Needs
 * to be updated
 */

const login =  (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'REQUESTING-LOGIN');

    let { email, password } = req.body;

    UserSchema.find({ email })
    .exec()
    .then(users => {
        if (users[0].password === password) {
            log.info(namespace, '[LOGIN SUCCESS]');
            return res.status(200).json({ users: users[0].firstName })

        } else {
            log.info(namespace, '[LOGIN FAIL]');
            res.send('Login failed')
        }
    })
    .catch((error) => {
        return res.status(403).json({ message: error.message, error });
    });
}


/**
 * Returns all user's and their info.
 */

const getInfo = async (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'REQUESTING-INFO');
    
    UserSchema.find()
        .exec()
        .then((users) => {
            return res.json({ users: users });
                
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message, error });
        });
};

/**
 * Set request body to values and define new user using 
 * schema (/model), then return user or return error message
 */

const createUser =  async (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'CREATING-USER');
    let { firstName, lastName, email, password } = req.body;

    const user = new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password
    });
    return user.save()
    .then(result => {
        return res.status(201).json({ user: result });
    
    })
    .catch ((error) => {
        return res.status(500).json({ message: error.message, error });
    });
    
    
};

/**
 * deleteUser & updateUser were just made when testing with postman
 */

const deleteUser = (req: Request, res: Response) => {
    UserSchema.deleteOne({ _id: req.params.id })
        .exec()
        .then((users) => {
            return res.status(200).json({ users: users });
                
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message, error });
        });        
};

const updateUser = (req: Request, res: Response) => {
    UserSchema.findOneAndUpdate({ firstName: req.params.id }, req.body, { new: true })
    .exec()
    .then((users) => {
        res.json(users);
    });        
};


export default 
{
getInfo,
createUser,
deleteUser,
login,
updateUser
};