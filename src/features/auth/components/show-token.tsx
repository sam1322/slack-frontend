"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const ShowToken = () => {
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    // setCookie("token", "value");
    setCookieValue(getCookie("token") as string);
    console.log("hey", getCookie("token"));
    // setCookie('key', 'value', options);
  }, []);

  return (
    <div>
      <div className="bg-white"> token : {JSON.stringify(cookieValue)} </div>
    </div>
  );
};

export default ShowToken;
