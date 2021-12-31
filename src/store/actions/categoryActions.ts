import { Category, CategoryDispatch, CategoryForm } from "../../types/category";
import api from "../../utilities/api/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
  dispatch({ type: "GET_CATEGORY_START" });
  try {
    const response = await api().get<Category[]>("/categories");
    dispatch({ type: "GET_CATEGORY_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_CATEGORY_ERROR" });
  }
};

export const addCategory =
  (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "ADD_CATEGORY_START" });
    try {
      const response = await api().post<Category>("/categories", form);
      dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ADD_CATEGORY_ERROR" });
    }
  };

export const editCategory =
  (form: CategoryForm, updateId: number) =>
  async (dispatch: CategoryDispatch) => {
    dispatch({ type: "EDIT_CATEGORY_START" });
    try {
      const response = await api().put<Category>("/categories/" + updateId, form);
      dispatch({ type: "EDIT_CATEGORY_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "EDIT_CATEGORY_ERROR" });
    }
  };

  export const deleteCategory =
  (deleteId: number) =>
  async (dispatch: CategoryDispatch) => {
    dispatch({ type: "DELETE_CATEGORY_START" });
    try {
      const response = await api().delete<Category>("/categories/" + deleteId);
      dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: deleteId });
    } catch (error) {
      dispatch({ type: "DELETE_CATEGORY_ERROR" });
    }
  };

