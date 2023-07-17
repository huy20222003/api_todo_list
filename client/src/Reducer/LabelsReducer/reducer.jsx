import { CREATE_LABEL, DELETE_LABEL, EDIT_LABEL, GET_ALL_LABEL, SEARCH_LABEL, SET_LABEL } from "./constant";

export const initLabelState = {
    label: null,
    labels: [],
}

export const reducer = (state, action)=> {
    const {type, payload} = action;
    
    switch(type) {
        case GET_ALL_LABEL: 
            return {
                ...state,
                labels: payload,
            }
        case CREATE_LABEL:
            return {
                ...state,
                labels: [...state.labels, payload]
            }
        case EDIT_LABEL:
            const newLabel = state.labels.map((label)=> label._id === payload._id ? payload : label);
            return {
                ...state,
                labels: newLabel
            }
        case DELETE_LABEL: 
            return {
                ...state,
                labels: state.labels.filter(label => label._id != payload)
            }
        case SEARCH_LABEL: 
            return {
                labels: payload
            }
        // case FILTER_TODO: 
        //     return {
        //         todos: payload
        //     }
        case SET_LABEL: 
            return {
                ...state,
                label: payload
            }
        default: 
            return {
                ...state
            }
    }
}