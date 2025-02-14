import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
const FormLogin = () => {
  const { isLoading, error, login, token } = useAuthStore();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (token) {
      const { username, roleName } = jwtDecode(token);
      console.log(username);
      console.log(roleName);
      /**cara ngeset state di zustand dari luar */
      useAuthStore.setState({ isAuthenticated: true });
      // useAuthStore.setState({ roleName:   });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("username", username);
      localStorage.setItem("roleName", roleName);
      location.reload();
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      useAuthStore.setState({ error: null });
    }
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (dataLogin.email === "" || dataLogin.password === "") {
        toast.error("Please fill in all fields");
        return;
      }
      await login(dataLogin);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-[30rem] mx-auto shadow-xl rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={dataLogin.email}
            onChange={(e) => {
              setDataLogin({ ...dataLogin, email: e.target.value });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password.."
            value={dataLogin.password}
            onChange={(e) => {
              setDataLogin({ ...dataLogin, password: e.target.value });
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </section>
  );
};

export default FormLogin;
