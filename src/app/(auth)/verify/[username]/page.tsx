'use client'
import { verifySchema } from '@/schemas/verifySchema';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {  useForm } from 'react-hook-form';
import { toast } from "sonner";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const Verify = () => {
  const router = useRouter();
  const params = useParams<{username : string}>();

  const form = useForm<z.infer<typeof verifySchema>>({
      resolver: zodResolver(
        verifySchema
      ),
      defaultValues : {
        code : ''
      }
    });

    const onSubmit = async(data : z.infer<typeof verifySchema>)=>{
      try {
        const response = await axios.post<ApiResponse>('/api/verify-code', {
          username : params.username,
          verifyCode : data.code
        });
        toast.success(response.data.message);
        router.replace(`/sign-in`);
      } catch (error) {
        console.error("Error occured while signing up of the user",error);
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message ?? "Error signing up the user");
      }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 dark:text-white">Verify your account</h1>
          <p className="mb-4">Enter the verification code sent to your email to verify your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit"
              >Submit</Button>
            </form>
        </Form>
      </div>
    </div>
  )
}

export default Verify
