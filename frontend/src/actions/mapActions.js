import {
    VIEWPORT_CHANGE
} from './const';

export const viewportChange = (viewport) => {
    return {
        type: VIEWPORT_CHANGE,
        viewport,
    }
}