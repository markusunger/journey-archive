export type EntryType = 'html' | '';

export interface EntryWeather {
    id: number;
    degree_c: number;
    description: string;
    icon: string;
    place: string;
}

export interface JourneyFile {
    text: string;
    date_mofified: number;
    date_journal: number;
    id: string;
    preview_text: string;
    address: string;
    music_artist: string;
    music_title: string;
    lat: string;
    lon: string;
    mood: number;
    label: string;
    folder: string;
    sentiment: number;
    timezone: string;
    favourite: boolean;
    type: EntryType;
    weather: EntryWeather;
    photos: string[];
    tags: string[];
}
