'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { messageSchema } from '@/schemas/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';


const page = () => {
  const [suggestMessage, setSuggestMessage] = useState('');
  const [gettingMessage , setGettingMessage] = useState(false);
  const params = useParams();


  const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(
          messageSchema
        ),
        defaultValues : {
          content : ''
        }
      });


  const sendMessage = async(data : z.infer<typeof messageSchema>)=>{
    try {
      const response = await axios.post('/api/send-message',{
        username : params.username,
        content : data.content
      })
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error occured while sending message",error);
      toast.error("Error occured while sending message");
    }
  }


  const handleSuggestMessages = async()=>{
    try {
      setGettingMessage(true);
      const response = await axios.post('/api/suggest-messages');
      setSuggestMessage(response.data.message);
    } catch (error) {
      console.error("Error occured while suggesting messages",error);
      toast.error("Error occured while suggesting messages");
    }finally{
      setGettingMessage(false);
    }
  }


  useEffect(()=>{
    handleSuggestMessages();
  },[setSuggestMessage])
  
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 min-h-screen gap-4 mt-6 sm:mt-20 md:mt-10 overflow-hidden mt-20'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center px-2'>Public Profile Link</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(sendMessage)} className="space-y-6 sm:space-y-8">
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg sm:text-xl md:text-2xl'>Send Message</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Type your message here....." 
                        {...field} 
                        className="w-full text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='cursor-pointer w-full sm:w-auto'>
                Send
              </Button>
            </form>
        </Form>
        <Separator className='my-6 sm:my-8'/>
        <Button className="cursor-pointer w-full sm:w-auto" onClick={handleSuggestMessages}>
          Suggest message
        </Button>
        <div className='mt-4'>
          <h4 className='text-sm sm:text-base mb-2 sm:mb-0'>Click on the message to select</h4>
          <div className='max-w-6xl mx-auto px-1 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-8 md:py-12 lg:py-20 flex flex-col justify-center items-center border p-3 sm:p-4 mt-4 rounded'>
            {gettingMessage ? (
              <h4 className='flex items-center'>
                <Loader className='mr-2 animate-spin w-4 h-4 sm:w-5 sm:h-5' />
                <span className='text-sm sm:text-base'>Loading...</span>
              </h4>
            ) : (
              <>
              <span className='text-sm sm:text-base font-semibold'>Suggested Messages</span>
              <div className="w-full flex flex-wrap justify-center gap-2">
                
                {suggestMessage.split('||').map((message, index) => (
                  <Button
                    key={index}
                    className='max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg my-1 sm:my-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-black dark:text-slate-400 text-xs sm:text-sm md:text-base px-2 sm:px-3 sm:py-2 h-auto min-h-[32px] sm:min-h-[36px] whitespace-normal text-left overflow-hidden hyphens-auto cursor-pointer'
                    onClick={() => {
                      form.setValue('content', message);
                    }}
                  >
                    <span className='block w-full text-center leading-tight break-words'>{message}</span>
                  </Button>
                ))}
              </div>
              </>
            )}
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <Link className='items-center' href={'/sign-up'}><Button className='cursor-pointer w-full sm:w-auto mt-15 sm:mt-20 h-12 rounded-full'>Create Account</Button></Link>
        </div>
    </div>
  )
}


export default page
