"use client"
import axios from 'axios';
import { toast } from 'sonner';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Message } from '@/model/User';

type MessageCardProps={
  message: Message;
  onMessageDelete:(messageId : string)=>void
}

const MessageCard = ({message , onMessageDelete} : MessageCardProps) => {

  const handleDeleteConfirm = async()=>{
    try {
      const response = await axios.delete(`/api/delete-message/${message._id}`);
      toast.success(response.data.message);
      onMessageDelete(message._id);
    } catch (error) {
      console.error("Error occured while deleting message",error);
      toast.error("Error occured while deleting message");
    }
  }


  return (
    <div>
      
          <Card >
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive"><X/></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm}>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <CardDescription>{message.content}</CardDescription>
              <CardAction >Card Action</CardAction>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        
    </div>
  )
}

export default MessageCard
