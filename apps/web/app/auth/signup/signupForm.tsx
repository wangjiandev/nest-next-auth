import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupForm = () => {
  return (
    <form>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Name" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>
      <SubmitButton>Sign up</SubmitButton>
    </form>
  );
};

export default SignupForm;
