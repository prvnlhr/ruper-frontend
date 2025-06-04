import { Icon } from '@iconify/react'

const SubHeader = ({
  activeForm,
  setActiveForm,
}: {
  activeForm: 'income' | 'expense'
  setActiveForm: (form: 'income' | 'expense') => void
}) => {
  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center">
      <button
        className={`w-[auto] h-[80%] flex border border-[#4E4E4E] rounded-full p-[2px] mr-[10px] transition-colors ${activeForm === 'income' ? 'bg-[#3A3C3D]' : 'bg-[#2A292E]'}`}
        onClick={() => setActiveForm('income')}
      >
        <div
          className={`h-[100%] aspect-square flex items-center justify-center border border-[#4E4E4E] rounded-full cursor-pointer ${activeForm === 'income' ? 'bg-[#4E4E4E]' : 'bg-[#3A3C3D]'}`}
        >
          <Icon
            icon="stash:wallet-light"
            className="w-[20px] h-[20px] text-[#ededed]"
          />
        </div>
        <div className="h-[100%] flex-1 flex items-center justify-center pr-[8px] pl-[8px]">
          <p className="text-xs text-[#ededed]">Add Income</p>
        </div>
      </button>

      <button
        className={`w-[auto] h-[80%] flex border border-[#4E4E4E] rounded-full p-[2px] transition-colors ${activeForm === 'expense' ? 'bg-[#3A3C3D]' : 'bg-[#2A292E]'}`}
        onClick={() => setActiveForm('expense')}
      >
        <div
          className={`h-[100%] aspect-square flex items-center justify-center border border-[#4E4E4E] rounded-full cursor-pointer ${activeForm === 'expense' ? 'bg-[#4E4E4E]' : 'bg-[#3A3C3D]'}`}
        >
          <Icon
            icon="fluent:receipt-20-regular"
            className="w-[20px] h-[20px] text-[#ededed]"
          />
        </div>
        <div className="h-[100%] flex-1 flex items-center justify-center pr-[8px] pl-[8px]">
          <p className="text-xs text-[#ededed]">Add Expense</p>
        </div>
      </button>
    </div>
  )
}

export default SubHeader
