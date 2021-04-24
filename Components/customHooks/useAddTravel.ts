import { useReducer } from "react";
import { useMutation } from "@apollo/client";

import { ImagesActionsTypes } from "../../useReducers/imagesReducer/imagesActionsTypes";
import {
  reducer,
  initialState,
} from "../../useReducers/imagesReducer/imagesReducer";
import { ADD_TRAVEL } from "../../lib/graphql/client/mutations";
import { AddTravelType } from "../../types/AddTravelType";

const useAddTravel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [addTravel, addingStatus] = useMutation(ADD_TRAVEL, {
    onError: () => {},
  });

  const handleAddImage = () => {
    dispatch({
      type: ImagesActionsTypes.UPDATE_IMAGES,
      images: [...state.images!, { file: null, desc: null, base64: null }],
    });
  };

  const handleOnSubmit = (data: AddTravelType) => {
    const imagesAmount = state.images?.reduce(
      (accumulator: number, currentValue) => {
        if (currentValue.file !== null) accumulator++;
        return accumulator;
      },
      0
    );
    if (imagesAmount === 0) {
      return dispatch({
        type: ImagesActionsTypes.ERROR,
        error: "Wgraj przynajmniej jedno zdjęcie aby dodać podróż",
      });
    }
    const files = state.images
      ?.map((image) => ({ desc: image.desc, base64: image.base64 }))
      .filter((image) => image.base64 !== null);
    addTravel({
      variables: {
        files,
        refreshToken: localStorage.getItem("refreshToken"),
        travel: {
          name: data.travelName,
          description: data.travelDesc,
          private: data.travelPrivate,
          payAtention: data.travelPayAttention,
          startTime: data.travelStartTime,
          endTime: data.travelEndTime,
        },
      },
    });
  };

  return { handleOnSubmit, handleAddImage, state, dispatch, addingStatus };
};

export default useAddTravel;
