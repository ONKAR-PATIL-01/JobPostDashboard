// import './App.css';
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import store from './ReduxToolkit/store'; // Assuming you have your Redux store configured in this file

function App() {
  return (
    <Provider store={store}>
      <div>
        <Dashboard/>
      </div>
    </Provider>
  );
}

export default App;
