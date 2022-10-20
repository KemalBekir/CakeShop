import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <AuthProvider>
      <div id="body-container">
        <h1>Welcome</h1>
      </div>
    </AuthProvider>
  );
}

export default App;
