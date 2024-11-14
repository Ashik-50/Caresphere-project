import { useEffect } from 'react';
import React from 'react';
import AppRouting from './components/Routing/AppRouting';

const App = () => {
  useEffect(() => {
    const handleUnload = (event) => {
      if (document.visibilityState === 'hidden') {
        localStorage.removeItem('username');
      }
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <div className="App">
      <AppRouting />
    </div>
  );
};

export default App;
