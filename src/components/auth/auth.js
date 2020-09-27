import React, { useContext } from 'react';
import { LoginContext } from './context';
import { If } from 'react-if';
// may need to install this

const Auth = props => {
  const ctx = useContext(LoginContext);

  let okToRender = false;

  try {
    okToRender =
      ctx.loggedIn &&
      (props.capability
        ? ctx.user.capabilities.includes(props.capability)
        : true);
  } catch (e) {
    // console.log(ctx.can(props.capability));
    console.warn('Not Authorized');
  }

  return (
    <If condition={okToRender}>
      <div>{props.children}</div>
    </If>
  );
};

export default Auth;
