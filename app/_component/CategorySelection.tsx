'use client'
import { Loader } from "lucide-react";
import React from "react";
import useSWR, { Fetcher } from "swr";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { useOption } from "../hooks/OptionConext";


interface TriviaCategory {
    id:number;
    name:string;
}

interface TriviaCategories {
    trivia_categories:TriviaCategory[];
}

const fetcher: Fetcher<any,string> = (url): Promise<TriviaCategories> =>
fetch(url,{cache:"no-cache"}).then((res) => res.json());

export function CategorySelection () {
    const {option,setOption} = useOption()
    const {data,isLoading} = useSWR<TriviaCategories>("https://opentdb.com/api_category.php",fetcher)
  return (
    isLoading ? <Loader size={30} className="animate-spin"/>:
    <Select  onValueChange={ value => setOption({...option,level:option?.level as string,category:Number(value), number:option?.number as number})}>
    <SelectTrigger className={cn("p-4")}>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        {data?.trivia_categories?.map((category: TriviaCategory) => (
        <SelectItem  key={category.id} value={category.id.toString()}>
          {category.name}
        </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
    )
}
