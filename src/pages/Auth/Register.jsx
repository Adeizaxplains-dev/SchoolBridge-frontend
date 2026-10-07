import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API, { getErrorMessage } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const { data } = await API.post("/auth/register", {
        schoolName: schoolName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      // The new school always starts in onboarding
      const { redirect } = await login(data);

      navigate(redirect, { replace: true });
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(getErrorMessage(err, "Unable to register."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-slate-800">
            SchoolBridge
          </h1>

          <p className="mt-2 text-slate-500">
            Create your school account
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
            required
          />

        </div>

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
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating Account..."
            : "Create School Account"}
        </button>

        <div className="mt-6 text-center text-sm text-slate-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </div>

      </form>

    </div>
  );
}