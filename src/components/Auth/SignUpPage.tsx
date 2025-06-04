import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Icon } from '@iconify/react'

import authBannerImg1 from '../../../public/assets/banners/authPageBanner_rider.jpg'
import AppLogo from '../Common/AppLogo'
import SubmitBtn from './SubmitBtn'

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})

const headerHeaderLinks = [
  { label: 'Rider', href: '/user/auth', role: 'rider' },
  { label: 'Driver', href: '/driver/auth', role: 'driver' },
  { label: 'Admin', href: '/admin/auth', role: 'admin' },
]

const ROLE_HEADER_MESSAGES = {
  rider: {
    line1: "Let's get you",
    line2: 'signed in',
  },
  driver: {
    line1: 'Sign in to Driver',
    line2: 'partner portal',
  },
  admin: {
    line1: 'Sign in to access',
    line2: 'admin portal',
  },
}

type EmailFormData = z.infer<typeof emailSchema>

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = (data: EmailFormData) => {
    console.log('Submitted:', data)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full h-[70px] md:h-[15%] flex justify-center items-center"></div>

      <div className="w-full h-[calc(100%-70px)] md:w-[80%] md:h-[70%] flex flex-col md:flex-row">
        {/* Left Image */}
        <div className="relative w-[100%] md:w-[60%] h-[35%] md:h-[100%] rounded-[0px] md:rounded-[20px] overflow-hidden"></div>

        {/* Right Form Section */}
        <div className="flex flex-col items-center justify-center w-[100%] md:w-[40%] h-[65%] md:h-[100%]">
          <div className="w-[85%] h-[50px] flex items-center">
            <div className="w-auto h-[60%] flex items-center">
              <AppLogo />
            </div>
          </div>

          <div className="w-[80%] h-[calc(100%-50px)] grid grid-cols-[100%] grid-rows-[70px_70px_auto]">
            {/* Header */}
            <div className="w-[100%] h-[100%] flex items-center">
              <p className="font-light text-[1.7rem] leading-tight">
                Let's create a account
                <br />
                for your.
                <span className="text-[#B5E4FC]">.</span>
              </p>
            </div>

            {/* Notification placeholder - blank */}
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center" />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] h-auto">
              <div className="w-full h-auto grid grid-cols-[100%] grid-rows-[auto]">
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
