import {FormEvent, useState} from "react";;
import Head from "next/head";
import Link from "next/link"
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/InputGroup"

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<any>({})

    const router = useRouter()

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()

        try {

            await Axios.post('/auth/login', {username, password})

            router.push('/') 
        } catch (err) {
            console.log(err)
            setErrors(err.response.data)
        }
    }

    return (
        <div className="flex">
            <Head>
                <title>Login</title>
               
            </Head>

            <div className="h-screen bg-center bg-cover w-80" style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>

            <div className="flex flex-col justify-center pl-6">
                <div className="w-72">
                    <h1 className="mb-2 text-lg font-medium">Login</h1>
                    
                    <p className="mb-10 text-xs">
                    By continuing, you agree to our User Agreement and Privacy Policy
                    </p>

                    <form onSubmit={submitForm}>

                        <InputGroup className="mb-2" type="username" value={username} setValue={setUsername} placeholder="Username" error={errors.username} />
                        <InputGroup className="mb-4" type="password" value={password} setValue={setPassword} placeholder="Password" error={errors.password} />


                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
                            Login
                        </button>

                    </form>

                    <small>New to Redundit?
                        <Link href="/register">
                            <a className="ml-1 text-blue-500 uppercase">
                                Sign Up
                            </a>
                        </Link>
                    </small>

                </div>
            </div>

        </div>
    );
}
