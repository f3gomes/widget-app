import { useState } from "react";
import { Widget } from "../WidgetApp/Widget";

function Login() {
  const [showError, setShowError] = useState(false);

  return (
    <div className="md:h-screen mt-32 md:mt-0 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Tech Solutions</h1>

      <div className="bg-slate-100 py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg">
        <h2 className="text-3xl text-gray-400 mb-3">Login</h2>

        <div className="mb-2">
          <label className="text-sm text-gray-400">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mt-1 bg-gray-200 text-slate-900 rounded-md focus:outline-none"
          />
        </div>

        <div className="mt-2 mb-3">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-1 bg-gray-200 text-slate-900 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowError(!showError)}
          className="border-none bg-blue-800 py-2 px-3 text-white roudend-sm w-full mt-2 rounded-md hover:bg-blue-700 mb-5"
        >
          Sign In
        </button>

        <a href="#" className="text-sm text-blue-400">
          Forgot my Password
        </a>
      </div>

      <div>
        {showError && (
          <h3 className="text-red-500 text-xl">
            Ocorreu um erro ao efetuar login!
          </h3>
        )}
      </div>

      <Widget />
    </div>
  );
}

export default Login;
