'use client'
import React, {useEffect, useState } from 'react'
import { useOption } from '../hooks/OptionConext'
import useSWR, { Fetcher } from 'swr'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import {shuffle} from "lodash"
import Spinner from './Spinner'

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
    
    const {option,setOption} = useOption()
    
    const {data,isLoading} = useSWR<ResponseType>(`https://opentdb.com/api.php?amount=${option?.number}&category=${option?.category}&difficulty=${option?.level?.toLocaleLowerCase()}&type=multiple`,fetcher)
    const [points,setPoints] = useState<number>(0)
    const [i,setI] = useState<number>(0)
    const [isDone,setIsDone] = useState<boolean>(false)

      if(!user?.user?.email){
        router.push("/")
        return 
      }

      useEffect(()=>{
        let ansPoint = 3;
        if (option?.level.toLowerCase() === "medium") {
          ansPoint = 4;
        } else if (option?.level.toLowerCase() === "hard") {
          ansPoint = 5;
        }
        setPoints(ansPoint)
      },[option?.level])

    const handleCheckAndNext = (answer:string)=>{
      if(answer === data?.results[i].correct_answer){
        setPoints((pevPoints)=>pevPoints+pevPoints)

        }
        if((i+1) != data?.results.length!){
          setI((prevI)=>prevI+1)
        }else{
          updateLeader()
        }
      

    }

    const updateLeader = async()=>{
      setIsDone(true)
      fetch(`/api/leaderboard/update/${user?.user?.email}`,{
        method:"PUT",
        body: JSON.stringify({points})
      }).then(()=>{
        setIsDone(false)
        setOption(null)
        toast(`Result ${points}`)
        router.push("/")
      }).finally(()=>{
        setIsDone(false)
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
          <div className='grid md:grid-cols-2 gap-2'>
          { data?.results&& 
            shuffle(data?.results[i]?.incorrect_answers.concat(data.results[i]?.correct_answer)).map((ia,index)=>(
              <Button key={index} onClick={()=>handleCheckAndNext(ia)} variant="outline">{ia}</Button>
            ))
          }
          </div>
      </div>
      </div>
    ):
    <div className='flex justify-center'>
      {
        isDone&& 
        <Spinner status='calculating result....'/>
      }
    </div>
  )
}

export default QuizPlayground