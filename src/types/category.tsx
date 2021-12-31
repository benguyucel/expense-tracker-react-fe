import { ThunkDispatch } from "redux-thunk";

export interface Category {
  id: number;
  name: string;
  type: "expense" | "income";
  color: string;
}

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}
export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}
interface GET_CATEGORY_START {
  type: "GET_CATEGORY_START";
}

interface GET_CATEGORY_SUCCESS {
  type: "GET_CATEGORY_SUCCESS";
  payload: Category[];
}
interface GET_CATEGORY_ERROR {
  type: "GET_CATEGORY_ERROR";
}

interface ADD_CATEGORY_START {
  type: "ADD_CATEGORY_START";
}

interface ADD_CATEGORY_SUCCESS {
  type: "ADD_CATEGORY_SUCCESS";
  payload: Category;
}
interface ADD_CATEGORY_ERROR {
  type: "ADD_CATEGORY_ERROR";
}

interface EDIT_CATEGORY_START {
  type: "EDIT_CATEGORY_START";
}

interface EDIT_CATEGORY_SUCCESS {
  type: "EDIT_CATEGORY_SUCCESS";
  payload: Category;
}
interface EDIT_CATEGORY_ERROR {
  type: "EDIT_CATEGORY_ERROR";
}
interface DELETE_CATEGORY_START {
  type: "DELETE_CATEGORY_START";
}

interface DELETE_CATEGORY_SUCCESS {
  type: "DELETE_CATEGORY_SUCCESS";
  payload:number
}
interface DELETE_CATEGORY_ERROR {
  type: "DELETE_CATEGORY_ERROR";
}

export type CategoryAction =
  | GET_CATEGORY_START
  | GET_CATEGORY_SUCCESS
  | GET_CATEGORY_ERROR
  | ADD_CATEGORY_START
  | ADD_CATEGORY_SUCCESS
  | ADD_CATEGORY_ERROR
  | EDIT_CATEGORY_START
  | EDIT_CATEGORY_SUCCESS
  | EDIT_CATEGORY_ERROR
  | DELETE_CATEGORY_START
  | DELETE_CATEGORY_SUCCESS
  | DELETE_CATEGORY_ERROR;

export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
