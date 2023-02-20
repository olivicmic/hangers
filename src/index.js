import React from 'react';
import { createRoot } from 'react-dom/client';
//import { TextInput } from "./lib";

export default function App() {
  return <div>
      <h1>Hangers</h1>
  </div>;
};

createRoot( document.getElementById('root')).render(<App/>);
