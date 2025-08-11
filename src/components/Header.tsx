import { Box, Flex, Text, Button, TextField, DropdownMenu, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useContext } from "react";
import { UserContext } from "@/app/(group)/layout";
import UserDropDown from "./UserDropDown";
import { Building2, Bookmark, Sparkles } from "lucide-react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="px-6 py-4">
      <Box
        width="100%"
        className="glass rounded-2xl"
        p="4"
      >
        <Flex
          justify="between"
          align="center"
          wrap="wrap"
          className="gap-4 sm:flex-row flex-col"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Text size="5" weight="bold" className="text-white">
              JobSearch
            </Text>
          </Link>

          <SearchInput />

          <Flex gap="6" align="center" className="flex-wrap justify-center">
            <Link 
              href="/company" 
              className="flex items-center gap-2 text-foreground-secondary hover:text-white transition-all duration-300 group"
            >
              <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Companies</span>
            </Link>

            {user?.role === "CANDIDATE" && (
              <Link 
                href="/saved" 
                className="flex items-center gap-2 text-foreground-secondary hover:text-white transition-all duration-300 group"
              >
                <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Saved Jobs</span>
              </Link>
            )}

            <UserDropDown />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
}