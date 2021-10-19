import { Request, Response, NextFunction} from 'express';
import log from '../config/log';
import ScheduleSchmea from '../model/schedule-model';

const namespace = 'SCHEDULE-CONTROLLER';

/**
 * getEvents func. returns all "events" that follow the schedule schema, used
 * in calendar.vue to display a users upcoming events
 */

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'REQUESTING-EVENTS');

    ScheduleSchmea.find()
        .exec()
        .then((events) => {
            return res.json({events: events})
        })
        .catch((error) => {
            return res.status(500).json({message: error.message, error});
        });
};

/**
 * Creates an event, reading in the date and any other given info.,
 * then saves to db. Can be updated to allow for more info. on user's 
 * events
 */

const createEvent = (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'CREATING-EVENTS');

    let { date, extraInfo } = req.body
    const event = new ScheduleSchmea({
        date,
        extraInfo
    });
    return event.save()
    .then(result => {
        return res.status(201).json({event: result})
    })
    .catch((error) => {
        return res.status(500).json({msg: error.message, error})
    })
}

/**
 * Finds event that corresponds to a given id, and deletes it.
 * Can be updated to allow for different params.
 */

const deleteEvent = (req: Request, res: Response) => {
    ScheduleSchmea.deleteOne({ _id: req.params.id })
        .exec()
        .then((events) => {
            return res.status(200).json({ msg: events });  
        })
        .catch((error) => {
            return res.status(500).json({ message: error.message, error });
        });        
};

export default {
    getEvents,
    createEvent,
    deleteEvent
};