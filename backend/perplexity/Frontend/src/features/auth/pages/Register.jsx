import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    await handleRegister(username, email, password);
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-teal-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-teal-950/50 backdrop-blur">
        <div className="mb-8 text-center">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">
            Get started
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Create an account.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="register-username">
              Username
            </label>
            <input
              autoComplete="username"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              id="register-username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              required
              type="text"
              value={username}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="register-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              id="register-email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="register-password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              id="register-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              type="password"
              value={password}
            />
          </div>

          <button
            className="w-full rounded-lg bg-teal-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            type="submit"
          >
            Create account
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link className="font-semibold text-teal-400 transition hover:text-teal-300" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;