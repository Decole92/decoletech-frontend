"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "Login Successful!, Welcome back! Redirecting to dashboard..."
        );

        // console.log("response", await response.json());
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        `Login Failed, Please check your credentials and try again. ${error}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      toast(
        "Google Sign-up, Google OAuth integration would be implemented here."
      );
      router.push(`http://34.69.207.167:8084/auth/google/login`);
    } catch (error) {
      toast.error(`Google Sign-in Failed, Please try again later. ${error}`);
    }
  };

  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Hero-style background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800'>
        {/* Corner lighting effects */}
        <div className='absolute top-0 left-0 w-full h-full'>
          <div className='absolute -top-40 -left-40 w-96 h-96 bg-gradient-radial from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl'></div>
          <div className='absolute -top-20 -right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 via-cyan-400/15 to-transparent rounded-full blur-2xl'></div>
          <div className='absolute bottom-20 left-20 w-72 h-72 bg-gradient-radial from-blue-400/20 via-teal-500/10 to-transparent rounded-full blur-3xl'></div>
          <div
            className='absolute w-64 h-64 bg-gradient-radial from-cyan-300/20 via-blue-400/10 to-transparent rounded-full blur-2xl transition-all duration-300 ease-out pointer-events-none'
            style={{
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
            }}
          ></div>
        </div>

        {/* Abstract flowing lines */}
        <div className='absolute inset-0 opacity-40'>
          <svg className='w-full h-full' viewBox='0 0 1920 1080' fill='none'>
            <path
              d='M-100 200C300 150 500 250 900 200C1300 150 1500 350 1920 300'
              stroke='url(#gradient1)'
              strokeWidth='1.5'
              fill='none'
            />
            <path
              d='M-100 400C200 300 400 500 800 400C1200 300 1400 600 1920 500'
              stroke='url(#gradient2)'
              strokeWidth='2'
              fill='none'
            />
            <path
              d='M-100 600C300 500 500 700 900 600C1300 500 1500 800 1920 700'
              stroke='url(#gradient3)'
              strokeWidth='3'
              fill='none'
            />

            <defs>
              <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.8' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.6' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.4' />
              </linearGradient>
              <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#0891b2' stopOpacity='0.9' />
                <stop offset='50%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='100%' stopColor='#22d3ee' stopOpacity='0.3' />
              </linearGradient>
              <linearGradient id='gradient3' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.7' />
                <stop offset='50%' stopColor='#0891b2' stopOpacity='0.8' />
                <stop offset='100%' stopColor='#0e7490' stopOpacity='0.5' />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className='absolute inset-0 opacity-10'>
          <div
            className='w-full h-full'
            style={{
              backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Login Form */}
      <div className='relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-8 py-12'>
        <div className='w-full max-w-md'>
          <Card className='shadow-2xl border-0 bg-white/95 backdrop-blur-sm'>
            <CardHeader className='text-center pb-8'>
              <div className=''>
                <Logo />
              </div>

              <CardTitle className='text-3xl font-bold text-gray-900 mb-2'>
                Welcome Back
              </CardTitle>
              <CardDescription className='text-lg text-gray-600'>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className='px-8 pb-8'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Email Field */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='your.email@example.com'
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-12 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "focus:border-cyan-500 focus:ring-cyan-500"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-600'>{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='password'
                    className='text-sm font-medium text-gray-700'
                  >
                    Password
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Enter your password'
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`h-12 pr-12 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-cyan-500 focus:ring-cyan-500"
                      }`}
                      disabled={isSubmitting}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    >
                      {showPassword ? (
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                          />
                        </svg>
                      ) : (
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-sm text-red-600'>{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className='text-right'>
                  <Link
                    href='/forgot-password'
                    className='text-sm text-cyan-600 hover:text-cyan-700 transition-colors'
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50'
                >
                  {isSubmitting ? (
                    <div className='flex items-center'>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Divider */}
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-white text-gray-500'>
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google OAuth Button */}

                <Button
                  type='button'
                  onClick={handleGoogleSignIn}
                  variant='outline'
                  className='w-full h-12 border-gray-300 hover:bg-gray-50   transition-all duration-300'
                  disabled={isSubmitting}
                >
                  <svg className='w-5 h-5 mr-3' viewBox='0 0 24 24'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className='mt-8 text-center'>
                <p className='text-gray-600'>
                  Don&#39;t have an account?{" "}
                  <Link
                    href='/auth/register'
                    className='text-cyan-600 hover:text-cyan-700 font-medium transition-colors'
                  >
                    Create one here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
