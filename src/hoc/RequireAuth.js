import { Navigate } from "react-router-dom";


const RequireAuth = ({children, accsessToken, userId}) => {
//const auth = 'null';
//console.log(auth);
//console.log(!auth);

if(accsessToken==='') {
    console.log('redirect');
    return <Navigate to='/login'/>
    
}
  return children;
};

export default RequireAuth;
