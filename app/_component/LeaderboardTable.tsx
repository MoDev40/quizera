'use client'
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import Spinner from "./Spinner";
import { useUser } from "../hooks/UserContext";

interface TypeData {
  _id: string;
  user:{
    _id: string;
    name: string;
  };
  date:string;
  points:number;
}
interface TypeResponse {
  message: string;
  data:TypeData[];
}

const fetcher : Fetcher<any,string> = (url) : Promise<TypeResponse> => fetch(url,{cache:"no-cache"}).then((res)=>res.json()) 

const LeaderboardTable = () => {
  const router = useRouter()
  const [pageNum, setPageNum] = useState<number>(1);
  const {user} = useUser()
  const { data, isLoading } = useSWR<TypeResponse>(
    `/api/leaderboard/get/${pageNum}`,
    fetcher
  );

  if(!user){
    router.push("/")
    return 
  }
  
  const handlePrev = ()=>{
    if(pageNum != 1){
      setPageNum((prev)=>prev-1)
    }
  }
  return (
    isLoading  ? <Spinner status="Getting data...."/> :
    <Table className={cn("w-full")}>
    <TableCaption>
        <div className="flex flex-row justify-between">
        <Button className="hover:bg-zinc-200 bg-gradient-to-r from-blue-50 to-zinc-200 lg:w-16 lg:h-8 text-black lg:rounded-full" onClick={handlePrev}>{pageNum != 1 &&<ArrowLeft/>}</Button>
        <Button className="hover:bg-zinc-200 bg-gradient-to-r from-blue-50 to-zinc-200 lg:w-16 lg:h-8 text-black lg:rounded-full" onClick={()=>{setPageNum((prev)=>prev+1)}}><ArrowRight/></Button>
        </div>
        <Link href="/">
          <span className="text-center capitalize">back to the home</span>
        </Link>
    </TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Rank</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Month</TableHead>
        <TableHead className="text-right">Points</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
      {data?.data&&
        data?.data.map((item,index) => (
          <TableRow key={item._id}>
          <TableCell className="font-medium">{index+1}</TableCell>
          <TableCell>{item.user.name}</TableCell>
          <TableCell>{new Date().toLocaleDateString()}</TableCell>
          <TableCell className="text-right">{item.points}</TableCell>
          </TableRow>
        ))
      }
    </TableBody>
    </Table>
  )
}

export default LeaderboardTable