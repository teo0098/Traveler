import { Dispatch, useReducer, useRef } from "react"

import { ImageType } from "../../types/ImageType"
import { ImageActionsTypes } from "../../useReducers/imageReducer/imageActionsTypes"
import { initialState, reducer } from "../../useReducers/imageReducer/imageReducer"
import { ImagesActionsTypes } from "../../useReducers/imagesReducer/imagesActionsTypes"
import { Action } from "../../useReducers/imagesReducer/imagesReducer"

const useImage = (dispatchImages: Dispatch<Action>, imageIndex: number, images : ImageType[] | undefined) => {

    const inputFileRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const [state, dispatch] = useReducer(reducer, initialState)

    const getFile = (file : File) => {
        try {
            if (!file.type.includes('image'))
                throw new Error('Nie otrzymano zdjęcia')
            const reader = new FileReader();
            reader.onload = () => {
                if (!reader.result)
                    throw new Error('Nie można pobrać zdjęcia')
                if (!imageRef.current)
                    throw new Error('Nie można pobrać zdjęcia')
                imageRef.current.src = reader.result as string
            }
            reader.readAsDataURL(file);
            return undefined
        }
        catch (e) {
            return e.message
        }
    }

    const dispatchFileChange = (file : File) => {
        const newImages = [...images!]
        newImages[imageIndex].file = file
        dispatchImages({ type: ImagesActionsTypes.UPDATE_IMAGES, images: newImages })
    }

    const dispatchDescChange = (desc : string | undefined | null) => {
        dispatch({ type: ImageActionsTypes.UPDATE_DESC, desc })
        const newImages = [...images!]
        newImages[imageIndex].desc = desc
        dispatchImages({ type: ImagesActionsTypes.UPDATE_IMAGES, images: newImages })
    }

    const handleOnDragOver = (e : any) => {
        e.preventDefault();
    }

    const handleOnDragEnter = (e : any) => {
        e.preventDefault();
    }
    
    const handleOnDragLeave = (e : any) => {
        e.preventDefault();
    }
    
    const handleOnDrop = (e : any) => {
        e.preventDefault();
        try {
            const files = e.dataTransfer.files;
            const file = getFile(files[0])
            if (file !== undefined)
                throw new Error(file)
            dispatch({ type: ImageActionsTypes.UPLOAD_IMAGE, file: files[0] })
            dispatchFileChange(files[0])
        }
        catch (e) {
            dispatch({ type: ImageActionsTypes.ERROR, error: e.message })
        }
    }

    const handleOnChange = () => {
        try {
            if (!inputFileRef.current?.files || inputFileRef.current?.files[0] === undefined)
                throw new Error('Nie otrzymano zdjęcia')
            const file = getFile(inputFileRef.current.files[0])
            if (file !== undefined)
                throw new Error(file)
            dispatch({ type: ImageActionsTypes.UPLOAD_IMAGE, file: inputFileRef.current.files[0] })
            dispatchFileChange(inputFileRef.current.files[0])
        }
        catch (e) {
            dispatch({ type: ImageActionsTypes.ERROR, error: e.message })
        }
    }

    const handleOnClick = () => {
       inputFileRef.current?.click()
    }

    const handleRemoveFile = () => {
        dispatch({ type: ImageActionsTypes.REMOVE_FILE })
        inputFileRef.current!.value = ''
        const newImages = [...images!]
        newImages[imageIndex].file = null
        dispatchImages({ type: ImagesActionsTypes.UPDATE_IMAGES, images: newImages })
    }

    const handleRemoveImage = () => {
        dispatch({ type: ImageActionsTypes.REMOVE_FILE })
        let newImages = [...images!]
        newImages[imageIndex].desc = null
        newImages[imageIndex].file = null
        newImages = newImages.filter((_, i: number) => i !== imageIndex)
        dispatchImages({ type: ImagesActionsTypes.UPDATE_IMAGES, images: newImages })
    }

    return { handleOnChange, handleOnClick, handleOnDragOver, handleOnDragEnter, handleOnDragLeave, handleOnDrop, handleRemoveFile,
        handleRemoveImage, inputFileRef, imageRef, state, dispatchDescChange }
}

export default useImage