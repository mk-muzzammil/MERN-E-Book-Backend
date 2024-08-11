import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "@/http/api";
import { LoaderPinwheelIcon } from "lucide-react";

//here i am using simple way to get data from fields i will use react-form  to get data in login page
const RegisterPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      console.log("Registered Succesfully");
      navigate("/auth/login");
    },
  });
  const handleRegisterBtn = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(name, email, password);
    if (!name || !email || !password)
      return alert("Please fill all the fields");
    //make server call with the help of useMuatation hook of react-query
    mutation.mutate({ name, email, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account <br />
            {mutation.error?.response?.data?.message && (
              <p className="text-red-500 text-sm">
                {mutation.error.response.data.message}
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid  gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Max" ref={nameRef} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                ref={emailRef}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" ref={passwordRef} />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleRegisterBtn}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderPinwheelIcon />}
              <span className="ml-3">Create an account</span>
            </Button>
            {/* <Link to={"http://www.github.com/login"}>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </Link> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default RegisterPage;
