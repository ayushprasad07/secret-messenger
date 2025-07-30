'use client'
import { Message } from '@/model/User';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod"
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import z from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader, RefreshCcw } from 'lucide-react';
import MessageCard from '@/components/MessageCard';
import { User } from 'next-auth';


const page = () => {
  const [messages,setMessages] = useState<Message[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isSwitchLoading,setIsSwitchLoading] = useState(false);
  
  const handleMessageDelete = (messageId : string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  }

  const {data : session} = useSession();


  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver : zodResolver(acceptMessageSchema)
  })

  const {register, setValue, watch} = form

  const acceptMessages = watch('acceptMessage');

  const fetchAcceptMessage = useCallback(async()=>{
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessage', response.data?.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Error accepting messages");
    }finally{
      setIsSwitchLoading(false);
    }
  },[setValue]);

  const fetchMessages = useCallback(async(refersh : boolean = false)=>{
    setIsLoading(true);
    setIsSwitchLoading(false);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data?.messages ?? []);
      if(refersh){
        toast.success("Showing latest messages");
      }
    } catch (error) {
      console.error("Error occured while fetching messages",error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Error fetching messages");
    }finally{
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  },[setIsLoading, setMessages]);

  useEffect(()=>{
    if(!session || !session.user) return
    fetchMessages();
    fetchAcceptMessage();
  },[session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async()=>{
    try {
      const response = await axios.post('/api/accept-messages',{
        acceptMessages : !acceptMessages
      })
      setValue('acceptMessage',!acceptMessages)
      toast(response.data.message)
    } catch (error) {
      console.log("Error occured while accepting messages",error);
      toast.error("Error occured while accepting messages");
    }
  }

  if(!session || !session.user){
    return (
      <div className='mt-20'>
        You are not authenticated
      </div>
    )
  }

  const {username} = session.user as User;
  const profileUrl = `${window.location.protocol}//${window.location.host}/u/${username}`;

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(profileUrl);
    toast.success("Copied to clipboard");
  }

  return (
    <div className="mt-20 mb-8 px-4 md:px-8 lg:px-0 mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl  w-full max-w-6xl transition-all duration-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">User Dashboard</h1>
        
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2">
            <span>Copy your unique link</span>
            <span className="bg-blue-100 text-blue-700 dark:bg-gray-900 dark:text-blue-300 px-2 py-0.5 rounded text-xs">Share</span>
          </h2>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <input
              type='text'
              value={profileUrl}
              disabled
              className="input input-bordered w-full max-w-lg p-2 rounded text-base bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 font-mono text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={copyToClipboard}
              className="transition-all duration-300 bg-black  hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md focus:outline-none cursor-pointer"
            >
              Copy
            </Button>
          </div>
        </section>

        <section className="mb-8 flex items-center">
          <Switch
            {...register('acceptMessage')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            className="mr-3"
          />
          <span className="ml-2 text-base text-gray-700 dark:text-gray-300 transition-colors">
            Accept messages:
            <span className={`ml-2 font-bold ${acceptMessages ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
              {acceptMessages ? "On" : "Off"}
            </span>
          </span>
          {isSwitchLoading && <Loader className="ml-3 animate-spin text-blue-500" size={18} />}
        </section>

        <Separator className="mb-8"/>

        <div className="flex items-center gap-4 mb-6">
          <Button
            className="rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 flex items-center shadow-sm transition"
            variant={"outline"}
            onClick={(e)=>{
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <>
                <Loader className='mr-2 animate-spin' /> Loading...
              </>
            ) : (<>
              <RefreshCcw className='mr-2' /> Refresh
            </>)}
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">Reload received messages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0
            ? messages.map((message, index) => (
                <MessageCard
                  key={index}
                  message={message}
                  onMessageDelete={handleMessageDelete}
                />
              ))
            : (
              <div className="col-span-full text-center p-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 text-xl font-semibold mx-auto transition-all">
                No messages found
              </div>
            )}
        </div>
    </div>

  )
}

export default page
