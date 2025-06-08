import { useClerk, useUser } from '@clerk/clerk-react'
import AppLogo from '../Common/AppLogo'
import { useRef, useState } from 'react'
import LoadingSpinner from '../Common/Spinner/LoadingSpinner'
import { Icon } from '@iconify/react/dist/iconify.js'
import useClickOutside from '@/hooks/useClickOutside'

export default function Header() {
  const { user } = useUser()
  const firstName = user?.firstName
  const userEmailAddress = user?.primaryEmailAddress?.emailAddress

  const [isSigningOut, setIsSigningOut] = useState(false)
  const { signOut } = useClerk()

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useClickOutside(userMenuRef, () => {
    setIsUserMenuOpen(false)
  })

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev)
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="w-[100%] h-[100%] flex  px-[15px]">
      <div className="h-[100%] aspect-square flex items-center justify-center">
        <AppLogo />
      </div>
      <div className="h-[100%] flex-1 flex justify-end items-center">
        <div className="h-[100%] aspect-square flex items-center justify-center">
          <div className="relative w-[60%] aspect-square flex items-center justify-center rounded-full bg-[#2A292E] border border-[#4E4E4E]">
            <button
              onClick={toggleUserMenu}
              className="w-[80%] aspect-square flex items-center justify-center rounded-full bg-[#3A3C3D] cursor-pointer"
            >
              <p className="text-white">{firstName && firstName[0]}</p>
            </button>

            {isUserMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute w-[200px] h-[auto] flex right-[5px] top-[55px] p-[5px] bg-[#2A292E]  rounded border border-[#4E4E4E] shadow-[0px_3px_5px_rgba(0,0,0,0.04)] z-[10]"
              >
                <div className="w-[100%] h-[100%]">
                  <div className="w-[100%] h-[50px] flex flex-col justify-center bg-[#4E4E4E] px-[10px] rounded border border-black/10">
                    <p className="text-[1rem] font-medium text-white truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-white font-medium truncate">
                      {userEmailAddress}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-[100%] h-[40px] flex justify-center px-[15px] cursor-pointer rounded bg-[#FEF3F2] hover:bg-[#FEE4E2]"
                  >
                    <div className="h-[100%] w-auto flex items-center justify-center mr-[5px]">
                      {isSigningOut ? (
                        <div className="h-[50%] aspect-square flex items-center justify-center">
                          <LoadingSpinner color="white" />
                        </div>
                      ) : (
                        <Icon
                          icon="hugeicons:logout-square-01"
                          className="w-[20px] h-[20px] text-[#D92D20]"
                        />
                      )}
                    </div>
                    <div className="flex-1 h-[100%] flex items-center font-medium text-sm text-[#D92D20]">
                      Sign Out
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
