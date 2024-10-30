"use client";

import { Loader, LogOut } from "lucide-react";
// import { useAuthActions } from "@convex-dev/auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import { useEffect, useState } from "react";

// import { useCurrentUser } from "../api/use-current-user";

export const UserButton = () => {
  //   const { signOut } = useAuthActions();run de
  // const { data, isLoading } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();

  const signOut = async () => {
    try {
      const token = getCookie("token");
      const res = await axios.get("http://localhost:8080/api/p/v1/logout", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("logout result", res.data);
      deleteCookie("token");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const getUserData = async () => {
    try {
      const token = getCookie("token");
      setIsLoading(true);
      const res = await axios.get("http://localhost:8080/api/p/v1/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("user result", res.data);
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  // let isLoading = false;
  let data = { name: userData?.full_name, image: userData?.user_image ?? "" };

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) {
    return null;
  }

  const { image, name } = data;
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar className="rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-md" alt={name} src={image} title={name}/>
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-40">
        <DropdownMenuItem
          onClick={() => signOut()}
          className="h-10 cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
