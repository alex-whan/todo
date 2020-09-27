import React from 'react';

import ToDo from './components/todo/todo.js';

import SettingsProvider from './components/todo/context/settings';

export default function App() {
  return (
    <SettingsProvider>
      <ToDo />
    </SettingsProvider>
  );
}
