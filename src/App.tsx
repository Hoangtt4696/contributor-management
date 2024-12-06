import HomePage from '@/pages/Home';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <HomePage />
    </>
  );
}

export default App;
