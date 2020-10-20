import { Schema, Document, model } from 'mongoose';
import { JourneyFile } from '../lib/types';

export type IJourney = JourneyFile & Document;

const journeySchema = new Schema({
    text: String,
    type: String,
    date_modified: Number,
    date_journal: Number,
    id: String,
    preview_text: String,
    address: String,
    music_artist: String,
    music_title: String,
    lat: String,
    lon: String,
    mood: Number,
    label: String,
    folder: String,
    sentiment: Number,
    timezone: String,
    favourite: Boolean,
    weather: {
        id: Number,
        degree_c: Number,
        description: String,
        icon: String,
        place: String
    },
    photos: [String],
    tags: [String]
});

export default model<IJourney>('Journey', journeySchema);
