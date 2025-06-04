import AppLogo from '../Common/AppLogo'

export default function Header() {
  return (
    <header className="w-[100%] h-[100%] flex  px-[15px]">
      <div className="h-[100%] aspect-square flex items-center justify-center">
        <AppLogo />
      </div>
      <div className="h-[100%] flex-1 flex justify-end items-center">
        <div className="h-[100%] aspect-square flex items-center justify-center">
          <div className="w-[60%] aspect-square flex items-center justify-center rounded-full bg-[#2A292E] border border-[#4E4E4E]">
            <div className="w-[80%] aspect-square flex items-center justify-center rounded-full bg-[#3A3C3D]"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
