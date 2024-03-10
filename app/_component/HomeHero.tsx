'use client'
import React from 'react';
import NavBar from './NavBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useSWR, { Fetcher } from 'swr';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Spinner from './Spinner';
import Footer from './Footer';
import Hero from './Hero';
import { Choices, useUser } from '../hooks/UserContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface TriviaCategory {
  id:number;
  name:string;
}

interface TriviaCategories {
  trivia_categories:TriviaCategory[];
}

const optionsSchema = z.object({
  level:z.string().min(1),
  category:z.string().min(1),
  count:z.string().min(1),
})

type Inputs = z.infer<typeof optionsSchema> 

const levels : string[] = ["easy","medium","hard"]

function isUndefined(checker:any):boolean {
  return checker === undefined ? true : false 
}

function pointIdentifier(level:string):number {
  return level === "easy"  ?  3 : 5
}
const fetcher: Fetcher<any,string> = (url): Promise<TriviaCategories> =>
fetch(url,{cache:"no-cache"}).then((res) => res.json());


const HomeHero = () => {
  const form = useForm<Inputs>()
  const {data:categories,isLoading} = useSWR<TriviaCategories>("https://opentdb.com/api_category.php",fetcher)
  const {user,setChoices} = useUser()
  const router = useRouter()

  const onSubmit : SubmitHandler<Inputs> = (data) =>{
    if(isUndefined(data.level) || isUndefined(data.count) || isUndefined(data.category)){
      toast("Please select choice")
      return
    }
    const choices : Choices = {
      level:data.level,
      category_id:Number(data.category),
      count:Number(data.count),
      points:pointIdentifier(data.level)
    }
    setChoices(choices)
    router.push("/quiz/playground") 
  }
   return (
    <>
    <NavBar/>
    <div className="flex flex-col space-y-4 items-center justify-center h-screen">
      <Hero/>
        { isLoading ? <Spinner status='Getting ready'/> :
          user && <>
            <Form {...form}>
              <form className='flex space-y-4 md:space-y-0 flex-col items-center md:flex-row md:space-x-4' onSubmit={form.handleSubmit(onSubmit)}>
                {/* Level selection */}
                <FormField
                name="level"
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <Select   onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                      <SelectValue placeholder="Select a Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        levels.map((level,index) =>(
                          <SelectItem  key={index} value={level} >{level.charAt(0).toUpperCase()+level.slice(1)}</SelectItem>
                        ))
                      }
                    </SelectContent>
                    </Select>
                  </FormItem>
                )}
                />
                {/* category selection */}
                <FormField
                name="category"
                control={form.control}
                render={({field})=>(
                  <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { categories?.trivia_categories&&
                      categories?.trivia_categories?.map((category) =>(
                        <SelectItem key={category.id} value={category.id.toString()} >{category.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                  </Select>
                </FormItem>
                )}
                />
                {/* count input */}
                <FormField
                name="count"
                defaultValue='5'
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <Input type='text' {...field}/>
                  </FormItem>
                )}
                />
                <Button type="submit">Start</Button>
              </form>
            </Form>
          </>
        }
    </div>
    <Footer/>
    </>
  );
};

export default HomeHero;