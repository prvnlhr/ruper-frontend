import { Icon } from '@iconify/react/dist/iconify.js'

const Dashboard = () => {
  return (
    <div className="w-[100%] h-[100%] flex flex-col  border-[#4E4E4E] px-[30px]">
      <div className="w-[100%] h-[150px] flex items-center">
        <div className="h-[60%] w-[auto] flex items-center  border-[#4E4E4E]">
          <div className="w-[30px] h-[100%] flex items-center justify-center">
            <Icon
              icon="bx:rupee"
              className="w-[23px] h-[23px] text-[#ededed] mb-[0px]"
            />
          </div>
          <div className="w-[auto] h-[auto] flex justify-center flex-col">
            <div className="w-[100%] h-[auto] flex items-center">
              <p className="text-[4rem] text-[#ededed] leading-none">
                12524
                <span className="text-[2rem]">.25</span>
              </p>
            </div>
            <div className="w-[100%] h-[auto] flex items-center">
              <p className="text-[0.9rem] text-[#ededed] ml-[5px]">
                Total Income
              </p>
            </div>
          </div>
          <div className="w-[40px] h-[100%] flex items-center justify-center">
            <Icon
              icon="bitcoin-icons:arrow-up-filled"
              className="w-[30px] h-[30px] text-[#7CFD9D] mb-[0px]"
            />
          </div>
        </div>
        <div className="h-[60%] w-[auto] flex items-center  border-[#4E4E4E] ml-[20px]">
          <div className="w-[30px] h-[100%] flex items-center justify-center">
            <Icon
              icon="bx:rupee"
              className="w-[23px] h-[23px] text-[#ededed] mb-[0px]"
            />
          </div>
          <div className="w-[auto] h-[auto] flex justify-center flex-col">
            <div className="w-[100%] h-[auto] flex items-center">
              <p className="text-[4rem] text-[#ededed] leading-none">
                8231
                <span className="text-[2rem]">.52</span>
              </p>
            </div>
            <div className="w-[100%] h-[auto] flex items-center">
              <p className="text-[0.9rem] text-[#ededed] ml-[5px]">
                Total Expense
              </p>
            </div>
          </div>
          <div className="w-[40px] h-[100%] flex items-center justify-center">
            <Icon
              icon="bitcoin-icons:arrow-down-filled"
              className="w-[30px] h-[30px] text-[#FC7173] mb-[0px]"
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[calc(100%-150px)] flex p-[20px]">
        <div className="w-[100%] h-[100%] border"></div>
      </div>
    </div>
  )
}

export default Dashboard
