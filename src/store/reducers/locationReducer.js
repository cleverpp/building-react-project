/**
 * Created on 2018/6/21.
 */
export const rootLocationInfo = (
    state = {
        latitude: '',//维度31.233858
        longitude: '',//经度121.663881
    }, action = {}) => {
    let payload = action.payload;
    switch (action.type) {
        case "ROOTLOCATIONINFO" : {
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state;
    }
};
