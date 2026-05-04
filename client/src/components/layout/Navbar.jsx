import { Link } from "react-router";

export default function Navbar({ data }) {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-600 shadow-sm"></div>
          <Link to="/" className="text-lg font-semibold text-gray-800">
            TaskManager
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-1.5">
            
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold text-white"
            >
              {data?.avatar ? (
                <img
                  src={data.avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                data?.fullName?.charAt(0)
              )}
            </Link>

            <h2 className="text-sm font-semibold text-gray-800">
              {data?.fullName}
            </h2>

          </div>
        </div>
      </div>
    </nav>
  );
}