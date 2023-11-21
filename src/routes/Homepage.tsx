import Login from "../components/Login.tsx";
import { UserProp } from '../../types.ts';
const Homepage = ({ username, setUsername }: UserProp) => {
  return (
    <Login username={username} setUsername={setUsername}/>
  )
}

export default Homepage;