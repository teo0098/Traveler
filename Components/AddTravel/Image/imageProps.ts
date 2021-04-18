import { Dispatch } from "react";
import { ThemeInterface } from "../../../interfaces/themeInterface";

import { ImageType } from "../../../types/ImageType";
import { Action } from "../../../useReducers/imagesReducer/imagesReducer";

export interface ImageProps extends ThemeInterface {
    name : string;
    dispatchImages : Dispatch<Action>;
    imageIndex : number;
    images : ImageType[] | undefined;
}