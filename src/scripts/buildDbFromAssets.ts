import fs from 'fs';
import path from 'path';
import Journey from '../models/journey';
import { JourneyFile } from '../lib/types';

const ASSET_PATH = '../../assets/';

export const buildDbFromAssets = async (): Promise<void> => {
    const entryFileNames = fs.readdirSync(path.resolve(__dirname, ASSET_PATH)).filter((f) => f.endsWith('.json'));
    console.log(`Found ${entryFileNames.length} Journey JSON files.`);
    let newEntries = 0;

    await Promise.all(
        entryFileNames.map(async (entryFileName) => {
            const entry = fs.readFileSync(path.resolve(__dirname, `${ASSET_PATH}${entryFileName}`), 'utf8');
            if (!entry) return;

            let data: JourneyFile | undefined;
            try {
                data = JSON.parse(entry);
            } catch (e) {
                console.error(e);
                return;
            }

            const entryPresent = await Journey.exists({
                id: data?.id
            });
            if (!entryPresent) {
                newEntries += 1;
                await Journey.create(data as JourneyFile);
            }
        })
    );

    console.log(`Created ${newEntries} entries in database.`);
};
