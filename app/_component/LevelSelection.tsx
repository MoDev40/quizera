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

export function SelectLevel() {
    const [level, setLevel] = React.useState("")
  return (
    <Select onValueChange={ value => setLevel(value)}>
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
