import { Document } from 'mongoose';

export default interface schedule extends Document {
    date: Date,
    extraInfo: String  
}