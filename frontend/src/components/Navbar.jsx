import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Learning Platform</h1>
      <div>
        <Link className="px-4" to="/">Home</Link>
        <Link className="px-4" to="/challenges">Challenges</Link>
        <Link className="px-4" to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
