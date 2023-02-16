import { Navigate } from "react-router-dom";


const RequireAuth = ({children, userId}) => {
const auth = 'null';
console.log(auth);
console.log(!auth);
if(!auth) {
    console.log('redirect');
    return <Navigate to='/login'/>
    
}
  return children;
};

export default RequireAuth;
