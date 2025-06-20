import { Icon } from '@iconify/react/dist/iconify.js'
import { Oval } from 'react-loader-spinner'

const SubmitBtn = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`h-[50px] w-[50px] flex items-center justify-center rounded-full ${isSubmitting ? 'bg-[#3A3C3D]' : 'bg-white'} disabled:bg-[#4c4c4c] cursor-pointer`}
    >
      {isSubmitting ? (
        <Oval
          visible={true}
          color="#B5E4FC"
          secondaryColor="transparent"
          strokeWidth="3"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass="w-[70%] h-[70%] flex items-center justify-center"
        />
      ) : (
        <Icon
          icon="bi:arrow-up"
          className="h-[40%] w-[40%] rotate-45 text-black"
        />
      )}
    </button>
  )
}

export default SubmitBtn
