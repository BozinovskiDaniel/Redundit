import {FormEvent, useState} from "react";;
import Head from "next/head";
import Link from "next/link"
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/InputGroup"

export default function Register() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [agreement, setAgreement] = useState(false)
    const [errors, setErrors] = useState<any>({})


    const router = useRouter()


    const submitForm = async (e: FormEvent) => {
        e.preventDefault()

        if (!agreement) {
            setErrors({...errors, agreement: ' You must agree to T&Cs'})
            return
        }

        try {

            await Axios.post('/auth/register', {
            email, password, username
            })

            router.push('/login') 
        } catch (err) {
            console.log(err)
            setErrors(err.response.data)
        }
    }

    return (
        <div className="flex">
            <Head>
                <title>Register</title>
            </Head>

            <div className="h-screen bg-center bg-cover w-80" style={{ backgroundImage: "url('/images/bricks.jpg')" }}></div>

            <div className="flex flex-col justify-center pl-6">
                <div className="w-72">
                    <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
                    
                    <p className="mb-10 text-xs">
                    By continuing, you agree to our User Agreement and Privacy Policy
                    </p>

                    <form onSubmit={submitForm}>
                        <div className="mb-6"> 
                            <input type="checkbox" className="mr-1 cursor-pointer" id="agreement" checked={agreement}
                            onChange={e => setAgreement(e.target.checked)} />
                            <label htmlFor="agreement" className="text-xs cursor-pointer">
                                I agree to get emails about cool stuff
                            </label>
                            <small className="block font-medium text-red-600">{errors.agreement}</small>
                        </div>

                        <InputGroup className="mb-2" type="email" value={email} setValue={setEmail} placeholder="Email" error={errors.email} />
                        <InputGroup className="mb-2" type="username" value={username} setValue={setUsername} placeholder="Username" error={errors.username} />
                        <InputGroup className="mb-4" type="password" value={password} setValue={setPassword} placeholder="Password" error={errors.password} />


                        <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
                            Sign Up
                        </button>

                    </form>

                    <small>Already a redundit user?
                        <Link href="/login">
                            <a className="ml-1 text-blue-500 uppercase">
                                Log In
                            </a>
                        </Link>
                    </small>

                </div>
            </div>

        </div>
    );
}
