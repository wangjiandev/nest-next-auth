"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signin } from "@/lib/auth";
import Link from "next/link";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, formAction] = useActionState(signin, undefined);
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
          />
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Link className="text-sm underline" href="#">
          Forgot password?
        </Link>

        <SubmitButton>Sign In</SubmitButton>

        <div className="flex justify-between text-sm">
          <p>Don't have an account?</p>
          <Link className="text-sm underline" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
