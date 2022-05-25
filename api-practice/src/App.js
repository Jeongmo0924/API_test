import React, { memo } from 'react';
import PetApi from './pages/PetApi';

const App = memo(() => {
  return (
    <div>
      <PetApi />
    </div>
  );
});

export default App;