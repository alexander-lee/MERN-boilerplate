import { push } from 'react-router-redux';

export default function(dispatch, redirectURL){
  if(!redirectURL) 
    return;

  dispatch(push(redirectURL));
}
