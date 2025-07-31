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
import { Clock, Shield, Trash2, X } from 'lucide-react';
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
      
          <Card className="group relative hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Delete button - appears on hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this message?</AlertDialogTitle>
              <AlertDialogDescription>
                This secret message will be permanently deleted and cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader className="pb-4">
        {/* Anonymous badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            <Shield className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Secret</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            {message.createdAt 
              ? new Date(message.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : 'Just now'
            }
          </div>
        </div>

        {/* Message content */}
        <CardDescription className="text-gray-800 dark:text-gray-200 text-base leading-relaxed pr-8">
          {message.content}
        </CardDescription>
      </CardHeader>
    </Card>
        
    </div>
  )
}

export default MessageCard
