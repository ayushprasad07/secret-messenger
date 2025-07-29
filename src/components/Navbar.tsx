'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {User} from 'next-auth'
import { Button } from './ui/button'


const Navbar = () => {

    const {data : session} = useSession();

    const user : User = session?.user as User

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
            
            <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                <div className="absolute inset-0 w-10 h-10 bg-white/20 dark:bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-lg">S</span>
                </div>
                </div>
                <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Secret<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Message</span>
                </h1>
                </div>
            </Link>

            <div className="flex items-center space-x-4">
                {session ? (
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 dark:border-gray-700/20">
                    
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Welcome, {user?.username || user?.email}
                    </span>
                    </div>
                    <Button 
                    variant="ghost"
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full px-4 py-2  cursor-pointer"
                    onClick={() => signOut()}
                    >
                    Sign Out
                    </Button>
                </div>
                ) : (
                <Link href="/sign-in">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl cursor-pointer">
                    Get Started
                    </Button>
                </Link>
                )}
            </div>
            </div>
        </div>
    </nav>


  )
}

export default Navbar
