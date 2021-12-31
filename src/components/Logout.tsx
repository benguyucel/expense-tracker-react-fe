import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../store";
import { logOut } from "../store/actions/userActions";

export default function Logout() {
  const navigate = useNavigate();
  const { data } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  if(!data.username) navigate("/")
  return <div></div>;
}
