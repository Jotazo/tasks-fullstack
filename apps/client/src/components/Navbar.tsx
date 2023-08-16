import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="px-5 md:max-w-[90%] mx-auto flex justify-between items-center">
        <Link to="/">Next Mongo</Link>
        <ul>
          <li>
            <Link to="/tasks/new">New Task</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
