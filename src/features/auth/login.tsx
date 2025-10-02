import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { authApi } from '@/lib/zehnly-auth-api'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordInput } from '@/components/password-input'

type LoginFormData = {
  email: string
  password: string
  captchaToken: string
}

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
    captchaToken: z.string().min(1, 'Captcha token is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      captchaToken: 'dummy_token_for_testing', // Default captcha token for testing
    },
  })

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'INCORRECT_PASSWORD':
        return 'Incorrect password. Please try again.'
      case 'USER_NOT_FOUND':
        return 'User not found. Please check your email address.'
      case 'CAPTCHA_TOKEN_NOT_EXIST':
        return 'Captcha token is missing. Please refresh and try again.'
      case 'INVALID_EMAIL':
        return 'Please enter a valid email address.'
      case 'USER_BLOCKED':
        return 'Your account has been blocked. Please contact support.'
      default:
        return 'Login failed. Please try again.'
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await authApi.login(data)
      
      // Since tokens are in HTTP-only cookies, we just need to set authentication state
      // For now, we'll create a mock user object - in real app, you might fetch user info
      const user = {
        id: 1,
        email: data.email,
        role: 'admin',
      }
      
      auth.login(user)
      
      toast.success('Login successful!')
      navigate({ to: '/' })
    } catch (error: any) {
      const errorCode = error.response?.data?.error?.code
      const errorMessage = errorCode ? getErrorMessage(errorCode) : 'Login failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="captchaToken">Captcha Token</Label>
              <Input
                id="captchaToken"
                type="text"
                placeholder="Captcha token (dummy_token_for_testing)"
                {...register('captchaToken')}
                disabled={isLoading}
              />
              {errors.captchaToken && (
                <p className="text-sm text-destructive">{errors.captchaToken.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}