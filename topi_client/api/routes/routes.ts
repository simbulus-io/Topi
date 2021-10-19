import express from 'express';
import userController from '../controllers/user-controller';
import scheduleController from '../controllers/schedule-controller';


/** 
 * Creates routes to be used from app.ts, and call their
 * corresponding functions
 */

const router = express.Router();

/** 
 * Routes for testing with throw away login page need to update
 * after embedded into Topi project
 */

router.get('/get-info', userController.getInfo);
router.post('/create-user', userController.createUser);
router.post('/login', userController.login);
router.delete('/delete-user/:id', userController.deleteUser);
router.put('/update-user/:id', userController.updateUser);
router.get('/get-events', scheduleController.getEvents);
router.post('/create-event', scheduleController.createEvent)


export = router;