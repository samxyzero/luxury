"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-display text-2xl font-medium text-ink">
            Luxury Enterprises
          </span>
          <p className="label mt-2 text-ink-muted">Admin Sign In</p>
        </div>

        <form action={formAction} className="mt-10 space-y-6 border border-stone p-8">
          <div>
            <label htmlFor="email" className="label mb-2 block text-ink-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border-0 border-b border-stone bg-transparent py-2.5 text-ink outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="label mb-2 block text-ink-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border-0 border-b border-stone bg-transparent py-2.5 text-ink outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>

          {state.error && <p className="text-sm text-red-700">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="label w-full border border-navy py-3.5 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper disabled:opacity-50"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
