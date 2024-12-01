"use client";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="w-full mt-2"
      disabled={pending}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
