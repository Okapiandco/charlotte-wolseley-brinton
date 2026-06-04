"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const verified = searchParams.get("verify") === "1";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(verified);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("resend", {
      email,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] uppercase text-[#1a2840]">
            Event Fusion
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">Admin</h1>
        </div>

        {sent ? (
          <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
            <p className="font-semibold text-green-800">Check your email</p>
            <p className="mt-1 text-sm text-green-700">
              We sent a magic link to <strong>{email || "your email"}</strong>. Click it to sign in.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-4 text-xs text-green-600 underline underline-offset-2 hover:text-green-800"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-gray-500">
              Enter your email and we&apos;ll send a magic link to sign in instantly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="charlottewb@eventfusion.co.uk"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>
              {error && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? "Sendingâ€¦" : "Send magic link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

