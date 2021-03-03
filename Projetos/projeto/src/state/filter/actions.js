import * as filterTypes from './types';

export function toggleFilter(filter){
    return{
        type: filterTypes.TOOGLE_FILTER,
        payload: {
            filter: filter
        }
    }
}