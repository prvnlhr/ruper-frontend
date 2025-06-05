import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icon } from '@iconify/react'
import SubmitBtn from './SubmitBtn'
import { Link } from '@tanstack/react-router'
import { useSignIn } from '@clerk/clerk-react'
import { isClerkAPIResponseError } from '@clerk/clerk-react/errors'

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const { signIn, isLoaded: isSignInLoaded, setActive } = useSignIn()

  const onSubmit = async (data: SignInFormData) => {
    if (!isSignInLoaded || !signIn) return

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (signInAttempt.status !== 'complete') {
        throw new Error(getSignInStatusMessage(signInAttempt.status as string))
      }

      await setActive({ session: signInAttempt.createdSessionId })
    } catch (err) {
      const errorMessage = getClerkErrorMessage(err)
      console.log(' errorMessage:', errorMessage)
    }
  }

  function getSignInStatusMessage(status: string): string {
    const messages: Record<string, string> = {
      needs_first_factor: 'Complete verification to continue',
      needs_second_factor: 'Two-factor authentication required',
      needs_new_password: 'Password update needed',
    }
    return messages[status] || 'Additional steps required'
  }
  function getClerkErrorMessage(err: unknown): string {
    if (isClerkAPIResponseError(err)) {
      const firstError = err.errors[0]
      switch (firstError?.code) {
        case 'form_password_incorrect':
          return 'Incorrect password. Try again or reset it.'
        case 'form_identifier_not_found':
          return 'No account found with this email.'
        default:
          return (
            firstError?.longMessage || firstError?.message || 'Sign in failed.'
          )
      }
    }
    return err instanceof Error ? err.message : "Couldn't sign you in."
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,24,28,0)_0%,_rgba(23,24,28,0.2)_40%,_rgba(23,24,28,0.7)_100%)]"></div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col items-center justify-center w-[100%] md:w-[40%] h-[65%] md:h-[100%]">
          <div className="w-[80%] h-[100%] grid grid-cols-[100%] grid-rows-[70px_70px_auto]">
            {/* Header */}
            <div className="w-[100%] h-[100%] flex items-center">
              <p className="font-light text-[1.7rem] leading-tight text-white">
                Welcome back
                <br />
                Sign in to continue
                <span className="text-[#B5E4FC]">.</span>
              </p>
            </div>
            <div className="w-[100%] h-[30px] flex items-center my-[10px]">
              <p className="text-sm text-white">
                Not yet registered ?{' '}
                <Link
                  to="/auth/sign-up"
                  className="text-[#B5E4FC] font-medium hover:underline"
                >
                  SignUp
                </Link>
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[100%] h-[100%]"
            >
              <div className="w-full h-auto grid gap-y-4">
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
                        placeholder="Enter your email"
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

                {/* Password Field */}
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
                        placeholder="Enter your password"
                        disabled={isSubmitting}
                        autoComplete="current-password"
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
