'use client'
import React, {useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {shuffle} from "lodash"
import Spinner from './Spinner'
import { useUser } from '../hooks/UserContext'

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

const fetcher : Fetcher<any,string> = (url): Promise<ResponseType> => fetch(url,{cache:"force-cache"}).then((res) => res.json())

function sanitizeHtml(text:string):string {
  const element = document.createElement('h1');
  element.innerHTML = text;
  return element.textContent || element.innerText;
}


const QuizPlayground = () => {
    const {data:user} = useSession()
    const router = useRouter()
    const {choices} = useUser()
    
    const {data,isLoading} = useSWR<ResponseType>(`https://opentdb.com/api.php?amount=${choices?.count}&category=${choices?.category_id}&difficulty=${choices?.level?.toLocaleLowerCase()}&type=multiple`,fetcher)
    const [points,setPoints] = useState<number>(0)
    const [i,setI] = useState<number>(0)
    const [isDone,setIsDone] = useState<boolean>(false)

    const [resultLoad,setResultLoad] = useState<boolean>(false)

      if(!user?.user?.email){
        router.push("/")
        return 
      }

      const handleCheckAndNext = (answer: string) => {
        if (answer === data?.results[i].correct_answer) {
          setPoints((prevPoint) => prevPoint + choices?.points!);
        }

        if (i + 1 !== data?.results.length) {
          setI((prevI) => prevI + 1);
        }else{
          setIsDone(true)
        }

      
      };

    const updateLeader = async()=>{
      setIsDone(true)
      fetch(`/api/leaderboard/update/${user?.user?.email}`,{
        method:"PUT",
        body: JSON.stringify({points})
      }).then(()=>{
        toast(`Result ${points}`)
        router.push("/")
      }).finally(()=>{
        setIsDone(false)
        setResultLoad(false)
      })
    } 

  return (
    isLoading  ? <Spinner status='Preparing data....'/>:
    !isDone?(
      <div className='w-full p-4 space-y-5'>
      <div className='text-center'>
        {
          data?.results&&
          <>
            <h1>{sanitizeHtml(data?.results[i]?.question)}</h1>
            <p>({i+1}/{data?.results.length})</p>
          </>
        }
      </div>
      <div>
          <div className='w-full grid md:grid-cols-2 gap-2'>
          { data?.results&& 
            shuffle(data?.results[i]?.incorrect_answers.concat(data.results[i]?.correct_answer)).map((choose,index)=>(
              <Button className='w-full' key={index} onClick={()=>handleCheckAndNext(choose)} variant="outline">{sanitizeHtml(choose)}</Button>
            ))
          }
          </div>
      </div>
      </div>
    ):
    <div className='flex justify-center'>
      {
        resultLoad ? 
        <Spinner status='calculating result....'/>
        :
        <Button className='mt-10' disabled={resultLoad} onClick={updateLeader}>Push Result to Leaderboard</Button>
      }
    </div>
  )
}

export default QuizPlayground