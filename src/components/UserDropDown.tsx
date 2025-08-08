'use client'

import { UserContext } from "@/app/(group)/layout"
import { Avatar, DropdownMenu } from "@radix-ui/themes"
import Link from "next/link"
import { useContext } from "react"

const UserDropDown = () => {
    const {user} = useContext(UserContext);
  return (
      <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar radius='full' fallback={user?.name?.[0] || "U"} color="gray" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-[--color-panel-solid]">
                <DropdownMenu.Item>Edit profile</DropdownMenu.Item>
                <Link href = "/add-company"><DropdownMenu.Item>Add Company</DropdownMenu.Item></Link>
                <DropdownMenu.Item>Logout</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red">
                  Delete 
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
  )
}

export default UserDropDown;