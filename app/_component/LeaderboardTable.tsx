'use client'
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

const LeaderboardTable = () => {
  return (
    <Table className={cn("w-full")}>
    <TableCaption>Leaderboard's.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Rank</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Month</TableHead>
        <TableHead className="text-right">Points</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
        <TableCell className="font-medium text-[#FFD700]">1</TableCell>
        <TableCell>modev</TableCell>
        <TableCell>{new Date().toLocaleDateString()}</TableCell>
        <TableCell className="text-right">18</TableCell>
        </TableRow>
    </TableBody>
    </Table>
  )
}

export default LeaderboardTable