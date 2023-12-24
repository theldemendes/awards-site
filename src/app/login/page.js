"use client";
import React, { useState , useEffect } from "react"
import { supabase } from '../utils/supabase'
import { useRouter } from "next/navigation"
import 'dotenv/config'

export default function Login() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const [disableFormInput, setDisableFormInput] = useState(false);

    const router = useRouter()
    useEffect(() => {
        const verifyUser = async () => {
        try {
            const { data, error } = await supabase.auth.getSession()
        if (error) {
            router.push("/logout")
        } else {
            if (data.session) {
            router.push("/vote")
        }
        }
        } catch (error) {
            router.push("/logout")
        }
        }

        verifyUser()
    }, [])

    const handleSignup = async (event) => {
        event.preventDefault()
        setDisableFormInput(true)
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            shouldCreateUser: false,
            emailRedirectTo: 'https://localhost:3000/vote',
        })
        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
        }} catch (error) {
            setError(error.message)
        }
    }

    if (user) {
        return(
            <main>
                VOCÊ JÁ ESTÁ LOGADO
            </main>
        )
    } else {
        return(
            <main className='flex items-center justify-center h-screen flex-col'>
                <form onSubmit={handleSignup} className='flex items-center flex-col bg-zinc-950 w-96 h-44 rounded-xl'>
                <h2 className="font-poiret mt-5 mb-5 text-xl font-bold"> Faça o login com seu email para votar! </h2>
                    <input
                        disabled={disableFormInput}
                        required="true"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className='bg-zinc-900 mb-5 rounded-md w-72 h-8 px-1'>
                    </input>
                    {!disableFormInput && <button disabled={disableFormInput} type="submit" className='flex justify-center items-center font-poiret text-lg gap-2 w-28 h-10 cursor-pointer rounded-md shadow-2xl text-black font-bold bg-gradient-to-r from-[#fbd671] via-[#e1ad1d] to-[#be7912] hover:shadow-md hover:shadow-yellow-600 hover:scale-105 duration-300 hover:from-[#be8812] hover:to-[#fbcf71]'>
                        Fazer Login.
                    </button>}
                    {success && (
                        <p className="text-center">
                            Um link foi enviado para seu email! <br/> Utilize ele para logar!
                        </p>
                )}
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                
            </main>
        )
    }
}