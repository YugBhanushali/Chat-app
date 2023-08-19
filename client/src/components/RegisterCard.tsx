import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserContext } from "@/hooks/userContext"


export function RegisterCard() {
    const {user, setUser} = React.useContext(UserContext);

    const handleUser = (e:any) => {
        e.preventDefault()
        setUser(e.target.value)
        // socket.emit('register', user);
        setUser('')
    }
  return (
    <Card className="w-[450px] border-2 border-gray-400 py-4 px-4">
      <CardHeader>
        <CardTitle className="text-[30px]" >Register</CardTitle>
        <CardDescription>You have to register before chating.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="text-[20px]">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-[23px]" htmlFor="name">Name</Label>
              <Input id="name" className="text-[20px] border-2 border-gray-400"  placeholder="John wick" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label className="text-[23px]" htmlFor="email">Password</Label>
                <Input id="password" className="text-[20px] border-2 border-gray-400"  placeholder="*******" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Button className="text-[20px]">Start Chat</Button>
      </CardFooter>
    </Card>
  )
}
