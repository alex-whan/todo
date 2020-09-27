import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function Settings(props) {
  const [maxVisible, setMaxVisible] = useState(5);
  const [showCompleted, setShowCompleted] = useState(true);

  // props.children will tell the context provider to render all child components regardless of what gets wrapped in it

  return (
    <SettingsContext.Provider
      value={{ maxVisible, setMaxVisible, showCompleted, setShowCompleted }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default Settings;
