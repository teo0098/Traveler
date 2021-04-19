import { useReducer } from 'react';

import { ImagesActionsTypes } from '../../useReducers/imagesReducer/imagesActionsTypes';
import { reducer, initialState } from '../../useReducers/imagesReducer/imagesReducer';

const useAddTravel = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleAddImage = () => {
        dispatch({ type: ImagesActionsTypes.UPDATE_IMAGES, images: [...state.images!, {file: null, desc: null}] })
    }

    const handleOnSubmit = (data : {}) => {
        const imagesAmount = state.images?.reduce((accumulator: number, currentValue) => {
            if (currentValue.file !== null) accumulator++
            return accumulator
        }, 0)
        if (imagesAmount === 0) {
            return dispatch({ type: ImagesActionsTypes.ERROR, error: 'Wgraj przynajmniej jedno zdjęcie aby dodać podróż' })
        }
    }

    return { handleOnSubmit, handleAddImage, state, dispatch }
}

export default useAddTravel