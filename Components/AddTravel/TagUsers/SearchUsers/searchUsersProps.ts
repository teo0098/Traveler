import { Dispatch } from "react";

import { Action } from "../../../../useReducers/imagesReducer/imagesReducer";

export interface SearchUsersProps {
  dispatchImages: Dispatch<Action>;
  users: Array<{ id: number; username: string }> | undefined;
}
