"use client";
import { Button } from "@/components/ui/button";
import ShowToken from "@/features/auth/components/show-token";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
// import AuthScreen from "@/features/auth/components/auth-screen";

export default function Home() {
  return (
    <>
      Home Page
      <ShowToken />
      <Button
        variant={"slack"}
        onClick={async () => {
          try {
            const token = getCookie("token");
            const res = await axios.get(
              "http://localhost:8080/api/p/v1/logout",
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );
            console.log("logout result", res.data);
            deleteCookie("token");
            window.location.reload();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Logout{" "}
      </Button>
    </>
  );

  // return <AuthScreen />
  //  return <Button variant={"slack"}>Click me</Button>

  // return <div className="text-rose-500 font-bold text-2xl"> Hello world</div>
}
