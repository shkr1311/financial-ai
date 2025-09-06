'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { BarChart3, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loading, authUser, checkAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn(email, password);

    if (result.success) {
      router.push('/'); 
    }
  };

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    console.log(authUser)
    if (authUser) router.push('/')
  }, [authUser])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-md'>
        {/* Back to Home */}
        <Link
          href='/'
          className='inline-flex items-center text-slate-400 hover:text-teal-400 transition-colors mb-8'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Home
        </Link>

        {/* Sign In Card */}
        <div className='glass p-8 rounded-2xl border border-slate-700/50'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center'>
                <BarChart3 className='w-6 h-6 text-slate-900' />
              </div>
              <span className='text-2xl font-bold text-white'>FinanceAI</span>
            </div>
            <h1 className='text-2xl font-bold text-white mb-2'>Welcome Back</h1>
            <p className='text-slate-400'>
              Sign in to access your trading dashboard
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-slate-300 mb-2'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-slate-300 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all pr-12'
                  placeholder='Enter your password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='w-4 h-4 text-teal-400 bg-slate-800 border-slate-600 rounded focus:ring-teal-400 focus:ring-2'
                />
                <span className='ml-2 text-sm text-slate-300'>Remember me</span>
              </label>
              <a
                href='#'
                className='text-sm text-teal-400 hover:text-teal-300 transition-colors'
              >
                Forgot password?
              </a>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className='my-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-slate-600'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-slate-800 text-slate-400'>
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          {/* Social Sign In */}
          <div className='grid grid-cols-2 gap-3'>
            <button className='flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors'>
              {/* Google */}
              Google
            </button>
            <button className='flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-colors'>
              GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <div className='mt-6 text-center'>
            <p className='text-slate-400'>
              Don't have an account?{' '}
              <Link
                href='/signup'
                className='text-teal-400 hover:text-teal-300 transition-colors font-medium'
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
