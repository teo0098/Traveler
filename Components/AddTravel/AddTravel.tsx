import { withTheme } from "styled-components";
import { useForm } from "react-hook-form";
import { PlusCircle } from "react-feather";

import Button from "../Button/Button";
import Credentials from "../Credentials/Credentials";
import * as CredentialsSC from "../Credentials/styledCredentials";
import {
  TravelName,
  TravelDesc,
  TravelVisibility,
  TravelPayAttention,
  TravelStartTime,
  TravelEndTime,
} from "../Inputs/Inputs";
import { FormValues } from "./formValues";
import useAddTravel from "../customHooks/useAddTravel";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Image from "./Image/Image";
import * as SC from "./styledAddTravel";
import Success from "../Success/Success";
import { ThemeInterface } from "../../interfaces/themeInterface";
import TagUsers from "./TagUsers/TagUsers";
import SearchUsers from "./TagUsers/SearchUsers/SearchUsers";
import { ImageType } from "../../types/ImageType";

const AddTravel: React.FC<ThemeInterface> = ({ theme }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const {
    handleOnSubmit,
    handleAddImage,
    state: { images, users, error: imagesError },
    dispatch,
    addingStatus: { loading, error, called, data },
  } = useAddTravel();

  return (
    <Credentials single>
      <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <CredentialsSC.StyledInputsWrapper>
          <TravelName register={register} error={errors.travelName} />
          <TravelDesc register={register} error={errors.travelDesc} />
          {images!.map((_: ImageType, index: number) => (
            <Image
              images={images}
              imageIndex={index}
              dispatchImages={dispatch}
              key={`image${index}`}
              name={`image${index}`}
            />
          ))}
          {images!.length < 10 ? (
            <SC.StyledAddImage>
              <PlusCircle onClick={handleAddImage} />
            </SC.StyledAddImage>
          ) : null}
          <TravelPayAttention
            register={register}
            error={errors.travelPayAttention}
          />
          <SC.StyledDateUsers>
            <SC.StyledDate>
              <TravelStartTime register={register} />
              <TravelEndTime register={register} />
              <TravelVisibility register={register} />
            </SC.StyledDate>
            <TagUsers>
              <SearchUsers users={users} dispatchImages={dispatch} />
            </TagUsers>
          </SC.StyledDateUsers>
        </CredentialsSC.StyledInputsWrapper>
        {loading ? <Loader /> : null}
        <SC.StyledStatus>
          {error ? <Error> {error.message} </Error> : null}
          {imagesError ? <Error> {imagesError} </Error> : null}
          {!error && !loading && !imagesError && called ? (
            <Success> {data.addTravel} </Success>
          ) : null}
          <Button disabled={loading} color={theme.colors.primary}>
            Dodaj wyprawę
          </Button>
        </SC.StyledStatus>
      </CredentialsSC.StyledForm>
    </Credentials>
  );
};

export default withTheme(AddTravel);
