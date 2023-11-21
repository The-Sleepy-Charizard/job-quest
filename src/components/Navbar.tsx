import { NavProp } from '../../types.ts'

const Navbar = ({ setFilter }: NavProp) => {
  
  return (
    <nav className="navBar">
      <li>
        <button onClick={() => {setFilter('bookmark')}}>Bookmarked 📖</button>
      </li>
      <li>
        <button onClick={() => {setFilter('applying')}}>Applying ✍</button>
      </li>
      <li>
        <button onClick={() => {setFilter('applied')}}>Applied 🔥</button>
      </li>
      <li>
        <button onClick={() => {setFilter('interviewing')}}>Interviewing 🤝</button>
      </li>
      <li>
        <button onClick={() => {setFilter('offers')}}>Offers 🚀</button>
      </li>
      <li>
        <button onClick={() => {setFilter('untracked')}}>Untracked ♻️</button>
      </li>
    </nav>
  )

}

export default Navbar;