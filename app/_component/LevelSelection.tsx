'use client'
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useOption } from "../hooks/OptionConext"

export function SelectLevel() {
  const {option,setOption} = useOption()
  return (
    <Select onValueChange={ value => setOption({...option,level:value,category:option?.category as string, number:option?.number as number})}>
      <SelectTrigger className={cn("p-4")}>
        <SelectValue placeholder="Select a Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Levels</SelectLabel>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
