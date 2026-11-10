import { AuthHock } from "../../hocks/AuthHock";
import { Link } from "react-router";


export  function UserProfile() {
  return (
    <div>
      <div>UserProfile</div>
      <Link to='/myProducts'>my products</Link>
      <Link to='/add'>add</Link>
      <Link to='/history'>history</Link>
 
    </div>
  )
}

export default AuthHock(UserProfile);

