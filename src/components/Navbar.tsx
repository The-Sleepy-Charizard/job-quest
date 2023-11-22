import { NavProp } from '../../types.ts';

const Navbar = ({ setFilter }: NavProp) => {
  return (
    <nav className='bg-blue-300 container mx-auto rounded-md p-1'>
      <ul className='flex flex-row justify-around'>
        <li>
          <button
            className='focus:ring-2 focus:ring-blue-600 rounded-r-lg bg-gradient-to-r from-green-400 to-blue-500 p-2 px-8'
            onClick={() => {
              setFilter('bookmark');
            }}
          >
            Bookmarked 📖
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter('applying');
            }}
          >
            Applying ✍
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter('applied');
            }}
          >
            Applied 🔥
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter('interviewing');
            }}
          >
            Interviewing 🤝
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter('offers');
            }}
          >
            Offers 🚀
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter('untracked');
            }}
          >
            Untracked ♻️
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
