import { useMutation } from '@apollo/client';
import { useReducer } from 'react';

import { ADD_TRAVEL } from '../../lib/graphql/client/mutations';
import { ImagesActionsTypes } from '../../useReducers/imagesReducer/imagesActionsTypes';
import { reducer, initialState } from '../../useReducers/imagesReducer/imagesReducer';

const useAddTravel = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleAddImage = () => {
        dispatch({ type: ImagesActionsTypes.UPDATE_IMAGES, images: [...state.images!, {file: null, desc: null}] })
    }

    const handleOnSubmit = (data : {}) => {
        console.log(state.images)
    }

    return { handleOnSubmit, handleAddImage, state, dispatch }
}

export default useAddTravel