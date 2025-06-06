import { createTransaction } from '@/services/transaction/transactionServices'
import { financeCategories } from '@/utils/categoriesUtil'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { useParams } from '@tanstack/react-router'

type FormMode = 'expense' | 'income'

const TransactionForm = ({ mode = 'expense' }: { mode?: FormMode }) => {
  const [showCategories, setShowCategories] = useState(false)
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { userId } = useParams({ strict: false })
  console.log('userId:', userId)

  // Filter categories based on form mode
  const filteredCategories = financeCategories.filter((category) =>
    mode === 'income'
      ? category.id.includes('salary') ||
        category.id.includes('income') ||
        category.id.includes('dividends')
      : !category.id.includes('income') && !category.id.includes('dividends'),
  )

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategories(false)
  }

  const handleSubmit = async () => {
    if (!amount || !selectedCategory) return

    // Find the full category object
    const categoryObj = financeCategories.find(
      (cat) => cat.value === selectedCategory,
    )

    if (!categoryObj) {
      console.log(' categoryObj:', categoryObj)
      return
    }

    setIsSubmitting(true)

    try {
      await createTransaction({
        type: mode,
        amount: Number(amount),
        category: {
          id: categoryObj.id,
          name: categoryObj.value,
          icon: categoryObj.icon,
        },
        description: '',
        userId: userId as string,
      })

      // Reset form
      setAmount('')
      setSelectedCategory('')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add transaction'
      console.log(' errorMessage:', errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#2A292E] flex flex-col rounded-[35px]">
      <div className="relative w-[100%] h-[auto] flex items-center p-[20px]">
        {showCategories ? (
          <p className="text-[1.2rem] text-[#ededed] leading-none ml-[10px]">
            Select
            <br />
            Categories.
          </p>
        ) : (
          <p className="text-[1.2rem] text-[#ededed] leading-none ml-[10px]">
            {mode === 'income' ? 'Add Income' : 'Add Expense'}
          </p>
        )}

        <button
          onClick={() => setShowCategories(false)}
          className="top-[10px] right-[10px] absolute h-[35px] aspect-square flex items-center justify-center rounded-full bg-[#3A3C3D] border border-[#4E4E4E] cursor-pointer"
        >
          <Icon
            icon={showCategories ? 'ci:chevron-left' : `lets-icons:close-round`}
            className="w-[15px] h-[15px] text-[#ededed]"
          />
        </button>
      </div>

      {showCategories ? (
        <div className="w-[100%] flex-1 flex flex-col px-[20px] py-[20px] overflow-hidden">
          <div className="w-[100%] h-full flex flex-col overflow-y-scroll hide-scrollbar">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="w-[100%] h-[50px] min-h-[50px] flex cursor-pointer"
                onClick={() => handleCategorySelect(category.value)}
              >
                <div className="h-[100%] aspect-square flex items-center justify-center">
                  <div className="cursor-pointer hover:bg-[#58595a] h-[60%] aspect-square bg-[#3A3C3D] flex items-center justify-center rounded-full border border-[#4E4E4E]">
                    <Icon
                      icon={category.icon}
                      className="w-[15px] h-[15px] text-[#ededed]"
                    />
                  </div>
                </div>
                <div className="w-[100%] flex items-center h-[100%]">
                  <p className="w-[100%] h-auto flex items-center text-[1.5rem] leading-none text-[#FDA29B]">
                    {category.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="w-[100%] flex-1 flex flex-col p-[10px]">
            {/* Amount Input Group */}
            <div className="w-[100%] h-[auto] flex flex-col mb-[20px]">
              <div className="w-[100%] h-auto flex">
                <div className="h-[100%] aspect-square flex items-center justify-center">
                  <div className="h-[80%] aspect-square bg-[#3A3C3D] flex items-center justify-center rounded-full border border-[#4E4E4E]">
                    <Icon
                      icon="bx:rupee"
                      className="w-[20px] h-[20px] text-[#ededed]"
                    />
                  </div>
                </div>
                <div className="w-[100%] flex flex-col h-auto px-[10px]">
                  <input
                    type="number"
                    className="w-[100%] h-auto flex items-center text-[1.7rem] leading-none text-[#84CAFF] border-b border-[#4E4E4E] bg-transparent outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    disabled={isSubmitting}
                  />
                  <div className="w-[100%] h-auto flex items-center px-[5px]">
                    <p className="text-[1rem] text-[#ededed]">Amount</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Input Group */}
            <div className="w-[100%] h-[auto] flex flex-col">
              <div className="w-[100%] h-auto flex">
                <div className="h-[100%] aspect-square flex items-center justify-center">
                  <button
                    onClick={() => !isSubmitting && setShowCategories(true)}
                    disabled={isSubmitting}
                    className="cursor-pointer hover:bg-[#58595a] h-[80%] aspect-square bg-[#3A3C3D] flex items-center justify-center rounded-full border border-[#4E4E4E] disabled:opacity-50"
                  >
                    <Icon
                      icon={
                        mode === 'income'
                          ? 'ph:money-bold'
                          : 'ph:shopping-cart-bold'
                      }
                      className="w-[20px] h-[20px] text-[#ededed]"
                    />
                  </button>
                </div>
                <div className="w-[100%] flex flex-col h-auto px-[10px]">
                  <input
                    className="w-[100%] h-auto flex items-center text-[1.7rem] leading-none text-[#FDA29B] border-b border-[#4E4E4E] bg-transparent outline-none cursor-pointer disabled:opacity-50"
                    value={selectedCategory}
                    onClick={() => !isSubmitting && setShowCategories(true)}
                    readOnly
                    disabled={isSubmitting}
                    placeholder={
                      mode === 'income'
                        ? 'Select income source'
                        : 'Select category'
                    }
                  />
                  <div className="w-[100%] h-auto flex items-center px-[5px]">
                    <p className="text-[1rem] text-[#ededed]">Category</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] h-auto flex justify-end p-[8px]">
            <button
              onClick={handleSubmit}
              className="h-[50px] aspect-square flex items-center justify-center rounded-full bg-[#3A3C3D] border border-[#4E4E4E] hover:bg-[#58595a] transition-colors disabled:opacity-50"
              disabled={!amount || !selectedCategory || isSubmitting}
            >
              {isSubmitting ? (
                <Icon
                  icon="svg-spinners:180-ring"
                  className="w-[60%] h-[60%] text-[#ededed]"
                />
              ) : (
                <Icon
                  icon={
                    mode === 'income'
                      ? 'bitcoin-icons:arrow-down-filled'
                      : 'bitcoin-icons:arrow-up-filled'
                  }
                  className={`w-[60%] h-[60%] text-[#ededed] ${mode === 'income' ? 'rotate-[-45deg]' : 'rotate-45'}`}
                />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TransactionForm
