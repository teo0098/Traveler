import useGetUserData from "../customHooks/useGetUserData";
import React, {useEffect, useState} from "react";
import * as CredentialsSC from "../Credentials/styledCredentials";
import Button from "../Button/Button";
import theme from "../../styles/theme";
import {useForm} from "react-hook-form";
import {FormValues} from "./formValues";
import Error from "../Error/Error";
import * as Styled from "./styledChangePhoto";
import useUploadAvatar from "../customHooks/useUploadAvatar";
import * as SC from "../Inputs/styledInputs";

interface User {
    username?: string
    avatar?: string
}

const ChangePhoto : React.FC = () => {
    const { loadData, getData } = useGetUserData()
    const [user, setUser] = useState<User>({username:"Brak!", avatar:""});
    const { register, handleSubmit,  formState: { errors } } = useForm<FormValues>()
    let { handleOnSubmit, uploadStatus: {error, called}, imageRef } = useUploadAvatar()

    useEffect(()=>{

        loadData({refreshToken: localStorage.getItem('refreshToken')}).then((res)=>{

            if(res!=null)
            setUser(res.data.getUserData);

        })
    },[])

    useEffect(()=>{
        loadData({refreshToken: localStorage.getItem('refreshToken')}).then((res)=>{
            if(res!=null)
                setUser(res.data.getUserData);

        })
    },[called])

    return(
    <>
        <Styled.Box>
        <Styled.UserImage src={user.avatar} height={200} width={200} />
        <p>Cześć! {user.username}</p>
            <p>Tutaj możesz zmienić swoje zdjęcie profilowe.</p>
            <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
                <SC.StyledInputWrapperPhoto>
                    <SC.StyledInput
                        {...register("file", { required: "Pole jest wymagane" })}
                        id="file"
                        type="file"
                        ref={imageRef}
                    />
                    Dodaj zdjęcie profilowe
                </SC.StyledInputWrapperPhoto>

                {error ? <Error> {error.message} </Error> : null}
                <CredentialsSC.StyledSection>
                <Button
                    color={theme.colors.primary}
                >
                    Zmień zdjęcie
                </Button>
                </CredentialsSC.StyledSection>
            </CredentialsSC.StyledForm>
        </Styled.Box>


    </>
    );
}

export default ChangePhoto