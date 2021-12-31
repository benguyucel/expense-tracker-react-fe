import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utilities/api/api";

export const getRecords = () => async (dispatch: RecordDispatch) => {
  dispatch({ type: "GET_RECORD_START" });
  try {
    const response = await api().get<Record[]>("/records");
    // console.log(response.data)
    dispatch({ type: "GET_RECORD_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_RECORD_ERROR" });
  }
};
export const addRecord =
  (form: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "ADD_RECORD_START" });
    try {
      const response = await api().post<Record>("/records", form);
      dispatch({ type: "ADD_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "ADD_RECORD_ERROR" });
    }
  };
  
  export const editRecord =
  (form: RecordForm,updateId:number) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "EDIT_RECORD_START" });
    try {
      const response = await api().put<Record>("/records/"+updateId, form);
      dispatch({ type: "EDIT_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "EDIT_RECORD_ERROR" });
    }
  };


export const deleteRecord =
  (deleteid: number) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "DELETE_RECORD_START" });
    try {
      const response = await api().delete<Record>("/records/" + deleteid);
      dispatch({ type: "DELETE_RECORD_SUCCESS", payload: deleteid });
    } catch (error) {
      dispatch({ type: "DELETE_RECORD_ERROR" });
    }
  };
