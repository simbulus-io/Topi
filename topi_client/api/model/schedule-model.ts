import mongoose, { Schema } from 'mongoose';
import schedule from '../interface/schedule-interface';
import log from '../config/log'

/**
 * Schema for schedule information, needs to be thoroughly 
 * fleshed out.
 */

const ScheduleSchema: Schema = new Schema (
    {
        date: {
            type: Date
        },
        extraInfo: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

ScheduleSchema.post<schedule>('save', function() {
    log.info('MONGO', 'Scheduled-Event-Created: ', this);
});
export default mongoose.model<schedule>('Event', ScheduleSchema);