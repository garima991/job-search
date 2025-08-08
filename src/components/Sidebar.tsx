"use client";

import {
  RadioGroup,
  CheckboxGroup,
  Slider,
  Text,
  Heading,
  Separator,
  Box,
  Flex,
  Button,
} from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobType, setJobType] = useState<string[]>([]);
  const [employementType, setEmployementType] = useState<string>("");
  const [salary, setSalary] = useState<number>(4400);

  useEffect(() => {
    const jt = searchParams.getAll("jt");
    const et = searchParams.get("et");
    const ms = searchParams.get("ms");

    if (jt.length) setJobType(jt);
    if(et) setEmployementType(et);
    if (ms) setSalary(parseInt(ms));
  }, []);

  const handleApply = () => {
    const params = new URLSearchParams();

    if (salary) params.set("ms", salary.toString());

    if (employementType && employementType !== "all") {
      params.set("et", employementType);
    }

    jobType.forEach((jt) => params.append("jt", jt));

    router.push(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setJobType([]);
    setEmployementType("");
    setSalary(4400);
    router.push("/search?");
  };

  return (
    <Box className="min-w-64 p-6 bg-gray-800 border-r border-gray-700 max-h-fit rounded-lg">
      <Flex justify="between" align="center" className="mb-6">
        <Heading size="4" className="text-white">
          Filters
        </Heading>
        <Button
          variant="ghost"
          size="1"
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-300"
        >
          Clear All
        </Button>
      </Flex>

      <Box className="mb-6">
        <Text size="3" weight="medium" className="mb-3 block text-white">
          Job Type
        </Text>
        <CheckboxGroup.Root
          value={jobType}
          onValueChange={setJobType}
          className="flex flex-col gap-2"
        >
          <CheckboxGroup.Item value="fulltime">Full Time</CheckboxGroup.Item>
          <CheckboxGroup.Item value="parttime">Part Time</CheckboxGroup.Item>
          <CheckboxGroup.Item value="internship">Internship</CheckboxGroup.Item>
        </CheckboxGroup.Root>
      </Box>

      <Separator className="my-4" />

      <Box className="mb-6">
        <Text size="3" weight="medium" className="mb-3 block text-white">
          Work Location
        </Text>
        <RadioGroup.Root
          value={employementType}
          onValueChange={setEmployementType}
          className="flex flex-col gap-2"
        >
          <RadioGroup.Item value="all">All Locations</RadioGroup.Item>
          <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
          <RadioGroup.Item value="on-site">On-site</RadioGroup.Item>
          <RadioGroup.Item value="hybrid">Hybrid</RadioGroup.Item>
        </RadioGroup.Root>
      </Box>

      <Separator className="my-4" />


      <Box className="mb-6">
        <Flex justify="between" align="center" className="mb-3">
          <Text size="3" weight="medium" className="text-white">
            Salary Range
          </Text>
          <Text size="2" className="text-gray-300">
            ${salary}
          </Text>
        </Flex>
        <Box className="px-2">
          <Slider
            value={[salary]}
            onValueChange={(val) => setSalary(val[0])}
            max={20000}
            min={2000}
            step={500}
            className="w-full"
          />
          <Flex justify="between" className="mt-2 text-xs">
            <Text size="1" className="text-gray-400">
              $2000
            </Text>
            <Text size="1" className="text-gray-400">
              $20000
            </Text>
          </Flex>
        </Box>
      </Box>

      <Separator className="my-6" />

      <Button
        onClick={handleApply}
        variant="ghost"
        size="3"
        className="w-full bg-gray-700 hover:bg-gray-600 text-white transition"
      >
        Apply Filters
      </Button>
    </Box>
  );
};
