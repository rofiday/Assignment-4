import { Link } from "react-router-dom";
import TopNavigationBar from "../components/TopNavigationBar";

const LandingPageAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <TopNavigationBar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold leading-tight text-gray-900">
                Users
              </h2>
              <p className="text-gray-600">View and manage users</p>
              <Link
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                to="/user-page"
              >
                View Users
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold leading-tight text-gray-900">
                Products
              </h2>
              <p className="text-gray-600">View and manage products</p>
              <Link
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                to="/admin/products"
              >
                View Products
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold leading-tight text-gray-900">
                Customers
              </h2>
              <p className="text-gray-600">View and manage Customers</p>
              <Link
                className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                to="/customer-page"
              >
                View Customers
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Admin Dashboard. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageAdmin;
