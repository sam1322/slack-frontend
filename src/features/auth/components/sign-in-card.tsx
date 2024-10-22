import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 pb-0 space-y-5">
        <form className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => {
              window.location.href = "http://localhost:8080/auth/google";
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle
              className="absolute top-3 left-2.5"
              style={{ height: "1.25rem", width: "1.25rem" }}
            />
            Continue with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {
              window.location.href = "http://localhost:8080/auth/github";

            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub
              className="absolute top-3 left-2.5"
              style={{ height: "1.25rem", width: "1.25rem" }}
            />
            Continue with GitHub
          </Button>
          {/* TODO:Remove or comment the following buttons later */}
          <Button
            disabled={false}
            onClick={() => {
              window.location.href = "http://localhost:8080/logout/google";
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Logout with Google
          </Button>
          <Button
            disabled={false}
            onClick={() => {
              window.location.href = "http://localhost:8080/logout/github";
            }}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Logout with Github
          </Button>
        
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account ?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signUp")}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
