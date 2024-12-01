import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignupForm from "./signupForm";

const SignupPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>
      <SignupForm />
      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link className="underline" href={"/auth/login"}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
