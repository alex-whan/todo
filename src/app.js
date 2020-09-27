import React from 'react';

import ToDo from './components/todo/todo.js';
import Auth from './components/auth/auth';
import Login from './components/auth/login';

import SettingsProvider from './components/todo/context/settings';
import LoginProvider from './components/auth/context';

const EditLink = props => {
  return (
    <Auth capability="update">
      <span>Edit</span>
    </Auth>
  );
};

const DeleteLink = props => {
  return (
    <Auth capability="delete">
      <span>Delete</span>
    </Auth>
  );
};

export default function App() {
  return (
    <LoginProvider>
      <SettingsProvider>
        <Login />
        <EditLink />
        <DeleteLink />
        <ToDo />
      </SettingsProvider>
    </LoginProvider>
  );
}
