import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icon } from '@iconify/react'
import SubmitBtn from './SubmitBtn'
import { Link } from '@tanstack/react-router'
import { signUpUser } from '@/services/auth/authServices'
import { isClerkAPIResponseError } from '@clerk/clerk-react/errors'

const authSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignUpPageData = z.infer<typeof authSchema>

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpPageData>({
    resolver: zodResolver(authSchema),
  })

  function getErrorMessage(err: unknown): {
    title: string
    description: string
  } {
    // Handle Clerk errors
    if (isClerkAPIResponseError(err)) {
      const firstError = err.errors[0]
      return {
        title: 'Registration Error',
        description:
          firstError?.longMessage ||
          firstError?.message ||
          'Registration failed',
      }
    }

    // Handle backend API errors
    if (err instanceof Error) {
      try {
        // Try to parse the error message as JSON
        const errorData = JSON.parse(err.message)
        if (errorData.error === 'Email already registered') {
          return {
            title: 'Email Exists',
            description:
              'This email is already registered. Please sign in or use a different email.',
          }
        }
        if (errorData.details) {
          return {
            title: errorData.error || 'Registration Error',
            description: errorData.details,
          }
        }
      } catch (e) {
        console.log(' e:', e)
        // If not JSON, use the raw message
        return {
          title: 'Registration Error',
          description: err.message,
        }
      }
    }

    // Fallback for unknown errors
    return {
      title: 'Registration Error',
      description: 'Registration could not be completed. Please try again.',
    }
  }

  const onSubmit = async (data: SignUpPageData) => {
    console.log(data)
    try {
      const response = await signUpUser({
        email: data.email,
        password: data.password,
        fullname: data.fullName,
      })

      console.log(' response:', response)

      reset()
    } catch (error) {
      console.error('Registration error:', error)
      const { title, description } = getErrorMessage(error)
      console.log(' description:', description)
      console.log(' title:', title)
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full h-[70px] md:h-[15%] flex justify-center items-center"></div>

      <div className="w-full h-[calc(100%-70px)] md:w-[80%] md:h-[70%] flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="relative w-[100%] md:w-[60%] h-[35%] md:h-[100%] rounded-[0px] md:rounded-[20px] overflow-hidden">
          <div className="relative w-full h-full overflow-hidden group">
            <img
              className="w-full h-full object-cover blur-[1px] group-hover:blur-none transition-all duration-500 ease-out"
              src="https://images.unsplash.com/photo-1730789701634-5386e7271462"
              alt="Professional background"
            />

            {/* Customizable circular gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,24,28,0)_0%,_rgba(23,24,28,0.2)_40%,_rgba(23,24,28,0.7)_100%)]"></div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col items-center justify-center w-[100%] md:w-[40%] h-[65%] md:h-[100%]">
          <div className="w-[80%] h-[100%] grid grid-cols-[100%] grid-rows-[70px_70px_auto]">
            {/* Header */}
            <div className="w-[100%] h-[100%] flex items-center">
              <p className="font-light text-[1.7rem] leading-tight text-white">
                Let's create a account
                <br />
                for your
                <span className="text-[#B5E4FC]">.</span>
              </p>
            </div>

            <div className="w-[100%] h-[30px] flex items-center my-[10px]">
              <p className="text-sm text-white">
                Already Signed Up ?{' '}
                <Link
                  to="/auth/sign-in"
                  className="text-[#B5E4FC] font-medium hover:underline"
                >
                  SignIn
                </Link>
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[100%] h-[100%]"
            >
              <div className="w-full h-auto grid gap-y-4">
                {/* Full Name Field */}
                <div className="w-full h-auto">
                  <label className="w-full h-[30px] flex items-center text-[0.9rem] text-[#B5E4FC] font-normal">
                    FULL NAME
                  </label>
                  <div className="h-[40px] border-b border-[#505354]">
                    <div className="flex-1 h-full flex items-center">
                      <input
                        {...register('fullName')}
                        className="h-full flex-1 outline-none font-light text-white text-[0.8rem] bg-transparent"
                        placeholder="Enter your full name"
                        disabled={isSubmitting}
                        autoComplete="name"
                      />
                      <div className="h-full aspect-square flex items-center justify-center">
                        <Icon
                          icon="mdi:account-outline"
                          className="text-[#B5E4FC] w-[40%] h-[40%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[30px] flex items-center">
                    {errors.fullName && (
                      <p className="text-red-500 text-[0.75rem] font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="w-full h-auto">
                  <label className="w-full h-[30px] flex items-center text-[0.9rem] text-[#B5E4FC] font-normal">
                    EMAIL ADDRESS
                  </label>
                  <div className="h-[40px] border-b border-[#505354]">
                    <div className="flex-1 h-full flex items-center">
                      <input
                        {...register('email')}
                        className="h-full flex-1 outline-none font-light text-white text-[0.8rem] bg-transparent"
                        placeholder="Enter your email address"
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                      <div className="h-full aspect-square flex items-center justify-center">
                        <Icon
                          icon="tabler:mail-filled"
                          className="text-[#B5E4FC] w-[40%] h-[40%]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[30px] flex items-center">
                    {errors.email && (
                      <p className="text-red-500 text-[0.75rem] font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Fields - Side by Side */}
                <div className="w-full h-auto grid grid-cols-2 gap-x-4">
                  {/* Password */}
                  <div className="w-full h-auto">
                    <label className="w-full h-[30px] flex items-center text-[0.9rem] text-[#B5E4FC] font-normal">
                      PASSWORD
                    </label>
                    <div className="h-[40px] border-b border-[#505354]">
                      <div className="flex-1 h-full flex items-center">
                        <input
                          {...register('password')}
                          type="password"
                          className="h-full flex-1 outline-none font-light text-white text-[0.8rem] bg-transparent"
                          placeholder="Create password"
                          disabled={isSubmitting}
                          autoComplete="new-password"
                        />
                        <div className="h-full aspect-square flex items-center justify-center">
                          <Icon
                            icon="mdi:lock-outline"
                            className="text-[#B5E4FC] w-[40%] h-[40%]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[30px] flex items-center">
                      {errors.password && (
                        <p className="text-red-500 text-[0.75rem] font-medium">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="w-full h-auto">
                    <label className="w-full h-[30px] flex items-center text-[0.9rem] text-[#B5E4FC] font-normal">
                      CONFIRM PASSWORD
                    </label>
                    <div className="h-[40px] border-b border-[#505354]">
                      <div className="flex-1 h-full flex items-center">
                        <input
                          {...register('confirmPassword')}
                          type="password"
                          className="h-full flex-1 outline-none font-light text-white text-[0.8rem] bg-transparent"
                          placeholder="Confirm password"
                          disabled={isSubmitting}
                          autoComplete="new-password"
                        />
                        <div className="h-full aspect-square flex items-center justify-center">
                          <Icon
                            icon="mdi:lock-check-outline"
                            className="text-[#B5E4FC] w-[40%] h-[40%]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[30px] flex items-center">
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-[0.75rem] font-medium">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%] h-[80px] flex items-center">
                <SubmitBtn isSubmitting={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
