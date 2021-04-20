import { withTheme } from 'styled-components'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-feather'

import Button from '../Button/Button'
import Credentials from '../Credentials/Credentials'
import * as CredentialsSC from '../Credentials/styledCredentials'
import { TravelName, TravelDesc, TravelVisibility } from '../Inputs/Inputs'
import { FormValues } from './formValues'
import useAddTravel from '../customHooks/useAddTravel'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import Image from './Image/Image'
import * as SC from './styledAddTravel'
import Success from '../Success/Success'

const Signin : React.FC<{theme : {[key : string] : any}}> = ({ theme }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const { handleOnSubmit, handleAddImage, state: { images, error: imagesError }, dispatch,
            addingStatus: { loading, error, called, data } } = useAddTravel()

    return (
        <Credentials single>
            <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
                <CredentialsSC.StyledInputsWrapper>
                    <TravelName register={register} error={errors.travelName} />
                    <TravelDesc register={register} error={errors.travelDesc} />
                    {images!.map((_, index : number) => (
                        <Image images={images} imageIndex={index} dispatchImages={dispatch} key={`image${index}`} name={`image${index}`} />
                    ))}
                    {images!.length < 10 ?
                        <SC.StyledAddImage>
                            <PlusCircle onClick={handleAddImage} />
                        </SC.StyledAddImage>
                        : null
                    }
                    <TravelVisibility register={register} />
                </CredentialsSC.StyledInputsWrapper>
                {loading ? <Loader /> : null}
                {error ? <Error> {error.message} </Error> : null}
                {imagesError ? <Error> {imagesError} </Error> : null}
                {!error && !loading && !imagesError && called ? <Success> {data.addTravel} </Success> : null}
                <Button disabled={loading} color={theme.colors.primary}>Dodaj wyprawę</Button>
            </CredentialsSC.StyledForm>
        </Credentials>
    )
} 

export default withTheme(Signin)