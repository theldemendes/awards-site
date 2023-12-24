"use client";
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Logout() {
    const router = useRouter()
    
    useEffect(() => {
        localStorage.clear()
        router.push("/")
}, [])
}