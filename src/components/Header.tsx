import { Box, Flex, Text, Button, TextField, DropdownMenu, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import UserDropDown from "./UserDropDown";

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
            <Link href="/company" className="text-base">Companies</Link>

            {user?.role === "CANDIDATE" && (
              <Link href="/saved" className="text-base">Saved Jobs</Link>
            )}


            <UserDropDown />


          </Flex>
        </Flex>
      </Box>
    </header>
  );
}