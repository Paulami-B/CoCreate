"use client"

import { useAppDispatch, useAppSelector } from "@repo/common/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signoutSuccess } from "../../../packages/common/src/redux/authSlice";

export default function Home() {

  const user = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("persist:root");
      if (!token) {
        dispatch(signoutSuccess());
        router.push("/auth");
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [dispatch, router]);
  return (
    <div>
    </div>
  );
}
