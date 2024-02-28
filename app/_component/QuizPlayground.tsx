'use client'
import React, {useState } from 'react'
import { useOption } from '../hooks/OptionConext'
import useSWR, { Fetcher } from 'swr'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Question {
  id: number;
  type: string;
  category: number;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
interface ResponseType {
  response_code:number;
  results:Question[]
}

const fetcher : Fetcher<any,string> = (url): Promise<ResponseType> => fetch(url,{cache:"no-cache"}).then((res) => res.json())

const QuizPlayground = () => {
    const router = useRouter()
    const {option} = useOption()
    const {data,isLoading} = useSWR<ResponseType>(`https://opentdb.com/api.php?amount=${option?.number}&category=${Number(option?.category)}&difficulty=${option?.level.toLocaleLowerCase()}&type=multiple`,fetcher)
    const [points,setPoints] = useState<number>(0)
    const [i,setI] = useState<number>(0)
    const [isDone,setIsDone] = useState<boolean>(false)

    const handleCheckAndNext = (answer:string)=>{
      if(answer === data?.results[i].correct_answer){
        setPoints((prevPoints)=>prevPoints+3)
      }

      if((i+1) != data?.results.length!){
        setI((prevI)=>prevI+1)
      }else{
        setIsDone(true)
      }

    }

  return (
    isLoading  ? <div className='flex space-x-2 justify-center mt-10'><Loader className='animate-spin'/><p>Fetching data....</p></div>:
    !isDone?(
      <div className='w-full p-4 space-y-5'>
      <div className='text-center'>
        {
          data?.results&&
          <>
            <h1>{data?.results[i].question}</h1>
            <p>({i+1}/{data?.results.length})</p>
          </>
        }
      </div>
      <div>
          <div className='grid md:grid-cols-2 gap-2'>
          { data?.results&& 
            data?.results[i].incorrect_answers.concat(data.results[i].correct_answer).map((ia,index)=>(
                <Button key={index} onClick={()=>handleCheckAndNext(ia)} variant="outline">{ia}</Button>
            ))
          }
          </div>
      </div>
      </div>
    ):
    <div className='flex space-x-2 justify-center mt-10'><Loader className='animate-spin'/><p>calculating result....</p></div>
  )
}

export default QuizPlayground