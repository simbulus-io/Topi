import { Request, Response, NextFunction} from 'express';
import log from '../config/log';
import ScheduleSchmea from '../model/schedule-model';

const namespace = 'SCHEDULE-CONTROLLER';

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

const createEvent = (req: Request, res: Response, next: NextFunction) => {
    log.info(namespace, 'CREATING-EVENTS');

    let { date, info } = req.body
    const event = new ScheduleSchmea({
        date,
        info
    });
    return event.save()
    .then(result => {
        return res.status(201).json({event: result})
    })
    .catch((error) => {
        return res.status(500).json({msg: error.message, error})
    })
}

export default {
    getEvents,
    createEvent
};