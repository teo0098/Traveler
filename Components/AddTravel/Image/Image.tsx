import { Image as UploadIcon, XCircle } from 'react-feather'
import { withTheme } from 'styled-components'

import Button from '../../Button/Button'
import useImage from '../../customHooks/useImage'
import { ImageDesc } from '../../Inputs/Inputs'
import { ImageProps } from './imageProps'
import * as SC from './styledImage'

const Image : React.FC<ImageProps> = ({ theme, name, imageIndex, dispatchImages, images }) => {

    const { handleOnChange, 
        handleOnClick, 
        handleOnDragOver, 
        handleOnDragEnter, 
        handleOnDragLeave, 
        handleOnDrop, 
        handleRemoveFile,
        handleRemoveImage,
        inputFileRef, imageRef, state: { error, file, desc }, dispatchDescChange } = useImage(dispatchImages, imageIndex, images)

    return (
        <SC.StyledWrapper>
            <SC.StyledText error={error}> {error ? error : `Zdjęcie nr ${imageIndex + 1}`} </SC.StyledText>
            <SC.StyledImageWrapper 
                onDragOver={handleOnDragOver} 
                onDragEnter={handleOnDragEnter} 
                onDragLeave={handleOnDragLeave} 
                onDrop={handleOnDrop}
            >
                {imageIndex > 0 && imageIndex === images!.length - 1 ?
                     <SC.StyledClose onClick={handleRemoveImage}>
                        <XCircle />
                    </SC.StyledClose>
                    : null
                }
                {file === null ? 
                    <SC.StyledUploadIcon>
                        <UploadIcon />
                    </SC.StyledUploadIcon>
                :
                    <SC.StyledBox>
                        <SC.StyledClose onClick={handleRemoveFile}>
                            <XCircle />
                        </SC.StyledClose>
                        <SC.StyledImage draggable='false' ref={imageRef} alt='travel_image' />
                    </SC.StyledBox>
                }
                <SC.StyledImageUpload>
                    <Button handleOnClick={handleOnClick} type='button' color={theme.colors.primary}>Dodaj zdjęcie</Button>
                    <SC.StyledText> lub przeciągnij</SC.StyledText>
                    <input onChange={handleOnChange} ref={inputFileRef} type='file' hidden />
                </SC.StyledImageUpload>
                <ImageDesc value={desc} dispatchDescChange={dispatchDescChange} name={name} />
            </SC.StyledImageWrapper>
        </SC.StyledWrapper>
    )
}

export default withTheme(Image)