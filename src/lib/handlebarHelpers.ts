import { IJourney } from '../models/journey';

export const handlebarHelpers = {
    eachpage: (array: IJourney[], startIndex: number, options: any): string => {
        let result = '';
        array.forEach((entry, idx) => {
            result += options.fn({ entry, index: startIndex + idx });
        });
        return result;
    },
    same: <T>(arg1: T, arg2: T): boolean => arg1 == arg2
};
