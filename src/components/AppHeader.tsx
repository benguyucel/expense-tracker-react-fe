import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";
const { Header } = Layout;

export default function AppHeader() {
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  const  {pathname} = useLocation()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
  return (
    <>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"] }>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          {data.username ? (
            <React.Fragment>
              <Menu.Item key="categories">
                <Link to="/categories">Kategoriler</Link>
              </Menu.Item>
              <Menu.Item key="records">
                <Link to="/records">Harcama Kayıtları</Link>
              </Menu.Item>
              <Menu.Item key="cikis">
                <Link to="/logout">Çıkış</Link>
              </Menu.Item>
            </React.Fragment>
          ) : loading ? null: (
            <Menu.Item key="giris">
              <Link to="/login">Giriş</Link>
            </Menu.Item>
          ) }
        </Menu>
      </Header>
    </>
  );
}
