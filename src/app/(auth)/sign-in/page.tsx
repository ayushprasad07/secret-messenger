'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import {  useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Loader} from 'lucide-react'
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(
      signInSchema
    ),
    defaultValues : {
      identifier : '',
      password : ''
    }
  });

  const onSubmit = async(data : z.infer<typeof signInSchema>)=>{
    setIsSubmitting(true);
    const result = await signIn ('credentials',{
      redirect : false,
      identifier : data.identifier,
      password : data.password
    })

    if(result?.error){
      toast.error("Incorrect email or password");
    }else{
      toast.success("Signed in successfully");
    }

    if(result?.url){
      router.replace('/dashboard');
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 overflow-x-hidden">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 dark:text-white">Join Secret-Messenger</h1>
          <p className="mb-4">Sign in to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl cursor-pointer">
              {isSubmitting ? (
                <>
                 <Loader className="mr-2 h-4 w-4 animate-spin"/>Please Wait
                </>
              ) : ("Sign In")}
            </Button>
          </form>
        </Form>
        <hr className="my-4"></hr>
        <div className="text-center mt-4">
          <p>
            Don&apos;t have an account? <Link href="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
