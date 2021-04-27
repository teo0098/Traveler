import { ImageType } from "../../types/ImageType";
import { ImagesActionsTypes } from "./imagesActionsTypes";

export const initialState = {
  error: "",
  images: [{ file: null, desc: null, base64: null }],
  users: [],
};

export type State = {
  error?: string | undefined;
  images?: Array<ImageType>;
  users?: Array<{ id: number; username: string }>;
};

export type Action = {
  type: string;
  error?: string | undefined;
  images?: Array<ImageType>;
  users?: Array<{ id: number; username: string }>;
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ImagesActionsTypes.UPDATE_IMAGES:
      return {
        ...initialState,
        images: [...action.images!],
      };
    case ImagesActionsTypes.TAG_USERS:
      return {
        ...state,
        users: [...action.users!],
      };
    case ImagesActionsTypes.ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
