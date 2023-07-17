import { CREATE_LABEL, DELETE_LABEL, EDIT_LABEL, GET_ALL_LABEL, SEARCH_LABEL, SET_LABEL } from "./constant";

export const getAll = (payload)=> {
    return {
        type: GET_ALL_LABEL,
        payload
    }
}

export const createLabel = (payload)=> {
    return {
        type: CREATE_LABEL,
        payload
    }
}

export const editLabel = (payload)=> {
    return {
        type: EDIT_LABEL,
        payload
    }
}

export const deleteLabel = (payload)=> {
    return {
        type: DELETE_LABEL,
        payload
    }
}

export const searchLabel = (payload)=> {
    return {
        type: SEARCH_LABEL,
        payload
    };
}

export const setLabel = (payload)=> {
    return {
        type: SET_LABEL,
        payload
    }
}