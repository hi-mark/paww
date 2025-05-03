"use client";

import { useEffect, useState } from "react";

export default function LogoutPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  /**
   * I would maybe make this server side, but to keep it simple for
   * assessment, logging out on pageload
   */
  useEffect(() => {
    logout();
  }, []);

  async function logout() {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
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
    <div>
      <h1>Logout</h1>

      {status === "success" ? (
        <p>You are successfully logged out.</p>
      ) : (
        <>
          <p>Click below to logout.</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
