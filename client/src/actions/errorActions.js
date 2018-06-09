import { CLEAR_ERRORS } from './types';

// Register User
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};