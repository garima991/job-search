import { Box, Flex, Text, Button, TextField, DropdownMenu, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="bg-gray-900 px-4">
      <Box
        width="100%"
        className="border-b border-gray-300 sticky top-0 bg-[--color-panel-solid] z-50"
        p="3"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >

          <Text size="5" weight="bold" color="blue" asChild>
            <Link href="/">JobSearch</Link>
          </Text>

          <SearchInput />

         

          <Flex gap="4" align="center" className="flex-wrap justify-center mr-8" >
          {user?.companys && (
            <Link href = "/company" className = "text-base">My Company</Link>
          )}

          {user?.companys && (
            <Link href = {`/add-company`} className = "text-base">Add Company</Link>
          )}

            {/* <Link href="/saved" className="text-base">Saved Jobs</Link> */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar radius='full' fallback={user?.name?.[0] || "U"} color="gray" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-[--color-panel-solid]">
                <DropdownMenu.Item>Edit profile</DropdownMenu.Item>
                <DropdownMenu.Item>Logout</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red">
                  Delete 
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}