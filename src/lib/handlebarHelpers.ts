import { IJourney } from '../models/journey';

export const handlebarHelpers = {
    eachindex: (array: IJourney[], options: any): string => {
        let result = '';
        array.forEach((entry, idx) => {
            result += options.fn({ entry, index: idx + 1 });
        });
        return result;
    },
    same: <T>(arg1: T, arg2: T): boolean => arg1 == arg2
};
