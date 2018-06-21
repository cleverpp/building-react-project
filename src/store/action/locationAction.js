/**
 * Created on 2018/6/21.
 */
export const ROOTLOCATIONINFO = 'ROOTLOCATIONINFO';

export const rootLocationInfoAction = (payload = {}) => {
    return {
        type: ROOTLOCATIONINFO,
        payload: payload
    }
}