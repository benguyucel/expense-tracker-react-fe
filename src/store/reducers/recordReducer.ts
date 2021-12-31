import { RecordActions, RecordState } from "../../types/record";
const defaultState: RecordState = {
  data: [],
  loading: false,
  error: "",
};
const recordReducer = (state = defaultState, action: RecordActions) => {
  switch (action.type) {
    case "GET_RECORD_START":
      return { ...state, loading: false, error: "" };
    case "GET_RECORD_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORD_ERROR":
      return { ...state, loading: false, error: "Get Record Error" };
    case "ADD_RECORD_START":
      return { ...state, loading: false, error: "" };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Error adding record" };

    case "EDIT_RECORD_START":
      return { ...state, loading: false, error: "" };
    case "EDIT_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case "EDIT_RECORD_ERROR":
      return { ...state, loading: false, error: "Error edit record" };

    case "DELETE_RECORD_START":
      return { ...state, loading: false, error: "" };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.payload),
      };
    case "DELETE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error delete record" };

    default:
      return { ...state };
  }
};

export default recordReducer;
