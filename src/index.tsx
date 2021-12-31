import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import rootReducer from './store';
import "antd/dist/antd.css";
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk))
ReactDOM.render(
<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
