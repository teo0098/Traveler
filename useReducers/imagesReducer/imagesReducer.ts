import { ImageType } from "../../types/ImageType"
import { ImagesActionsTypes } from "./imagesActionsTypes"

export const initialState = {
    error: '',
    images: [{ file: null, desc: null, base64: null }]
}

export type State = {
    error ?: string | undefined;
    images ?: Array<ImageType>;
}

export type Action = {
    type : string;
    error ?: string | undefined;
    images ?: Array<ImageType>;
}

export const reducer = (state : State, action : Action) => {
    switch (action.type) {
        case ImagesActionsTypes.UPDATE_IMAGES:
            return {
                ...initialState,
                images: [...action.images!]
            }
        case ImagesActionsTypes.ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}