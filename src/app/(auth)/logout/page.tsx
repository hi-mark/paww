"use client";

import { PrimaryButton } from "@/components/Buttons/Buttons";
import { useEffect, useState } from "react";

export default function LogoutPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    logout();
  }, []);

  async function logout() {
    try {
      const res = await fetch("/api/proxy/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Treat both 200 and 401 as logout success
      if (res.ok || res.status === 401) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <h1>Logout</h1>

      {status === "success" ? (
        <p>You are successfully logged out.</p>
      ) : (
        <>
          <p>Click below to logout.</p>
          <PrimaryButton fullWidth large onClick={logout}>
            Logout
          </PrimaryButton>
        </>
      )}
    </>
  );
}
