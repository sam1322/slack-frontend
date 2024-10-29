"use client";
import { Button } from "@/components/ui/button";
import ShowToken from "@/features/auth/components/show-token";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();
  // const {data , isLoading} = useGetWorkspace()
  let data = [{ _id: 1 }];
  let isLoading = false;
  // const workspaceId = useMemo(() => data?.[0]?._id, [data]);
  const workspaceId = false;

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workspace");
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen]);

  return (
    <>
      Home Page
      <ShowToken />
      <UserButton />
      {/* <Button
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
      </Button> */}
    </>
  );

  // return <AuthScreen />
  //  return <Button variant={"slack"}>Click me</Button>

  // return <div className="text-rose-500 font-bold text-2xl"> Hello world</div>
}
