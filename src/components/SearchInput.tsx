"use client";
import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const router = useRouter();
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  }
  return (
    <Box className="w-full sm:w-auto flex-grow sm:flex-grow-0">
      <TextField.Root
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        size="2"
        placeholder="Search jobs..."
        className="w-full"
      >
        <TextField.Slot>
          <Search className="h-5 w-5" />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
}