import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import Records from "./components/Records";
import SignUp from "./components/SignUp";
const { Content, Footer } = Layout;
function App() {
  return (
    <Layout>
      <AppHeader />
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/categories" element={<Categories />} />
            <Route path="/records" element={<Records />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Expense Tracker @ React Dersleri 2021
      </Footer>
    </Layout>
  );
}

export default App;
