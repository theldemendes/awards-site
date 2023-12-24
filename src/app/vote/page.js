"use client";
import React, { useState , useEffect } from "react"
import { supabase } from '../utils/supabase'
import { useRouter } from "next/navigation"
import 'dotenv/config'

export default function Vote() {
    const [user, setUser] = useState(null)

    const router = useRouter()
    useEffect(() => {
        const verifyUser = async () => {
        try {
            const { data, error } = await supabase.auth.getSession()
        if (error) {
            router.push("/logout")
        } else {
            if (!data.session) {
            router.push("/login")
        }

        setUser(data)
            localStorage.setItem("user", JSON.stringify(data))
        }
        } catch (error) {
            router.push("/logout")
        }
        }

        verifyUser()
    }, [])

    if (user) {
        return(
            <main>
                VOTAÇÃO
            </main>
        )
    }
}