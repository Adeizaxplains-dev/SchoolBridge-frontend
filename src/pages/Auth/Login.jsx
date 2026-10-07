import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await loginService({
        email: email.trim(),
        password,
      });

      // Wait for the session (and onboarding state) to be ready
      // BEFORE navigating, so the route guards see the right state.
      const { redirect } = await login(res);

      // Return to the page the user was trying to open, if any
      const from = location.state?.from?.pathname;
      const target =
        from && from !== "/login" && from !== "/" && redirect === "/dashboard"
          ? from
          : redirect;

      navigate(target, { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(getErrorMessage(err, "Unable to login."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >

        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          SchoolBridge
        </h1>

        <p className="mb-6 text-center text-slate-500">
          Sign in to continue
        </p>

        <input
          type="email"
          placeholder="Email Address"
          className="mb-4 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have a school account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}