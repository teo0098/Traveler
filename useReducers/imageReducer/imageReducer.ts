import { ImageActionsTypes } from "./imageActionsTypes"

export const initialState = {
    error: '',
    file: null,
    desc: null
}

export type State = {
    error ?: string | undefined;
    file ?: File | null;
    desc ?: string | null;
}

export type Action = {
    type : string;
    error ?: string | undefined;
    file ?: File | null;
    desc ?: string | null;
}

export const reducer = (state : State, action : Action) => {
    switch (action.type) {
        case ImageActionsTypes.UPLOAD_IMAGE:
            return {
                error: initialState.error,
                desc: state.desc,
                file: action.file
            }
        case ImageActionsTypes.REMOVE_FILE:
            return {
                ...initialState
            }
        case ImageActionsTypes.UPDATE_DESC:
            return {
                ...state,
                desc: action.desc
            }
        case ImageActionsTypes.ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}