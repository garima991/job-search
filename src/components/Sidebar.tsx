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
import { Filter, X, Search, MapPin, DollarSign } from "lucide-react";

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
    <Box className="w-full lg:min-w-80 p-4 sm:p-6 glass rounded-2xl m-2 sm:m-4">
      <Flex justify="between" align="center" className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="icon-container">
            <Filter className="w-5 h-5 text-black" />
          </div>
          <Heading size={{ initial: "3", sm: "4" }} className="text-white">
            Filters
          </Heading>
        </div>
        <Button
          variant="ghost"
          size="2"
          onClick={handleClear}
          className="text-foreground-muted hover:text-white hover:bg-background-tertiary rounded-lg transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </Button>
      </Flex>

      <Box className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Search className="w-4 h-4 text-white" />
          <Text size={{ initial: "2", sm: "3" }} className="text-white font-semibold">
            Job Type
          </Text>
        </div>
        <CheckboxGroup.Root
          value={jobType}
          onValueChange={setJobType}
          className="flex flex-col gap-2 sm:gap-3"
        >
          <CheckboxGroup.Item 
            value="fulltime"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            Full Time
          </CheckboxGroup.Item>
          <CheckboxGroup.Item 
            value="parttime"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            Part Time
          </CheckboxGroup.Item>
          <CheckboxGroup.Item 
            value="internship"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            Internship
          </CheckboxGroup.Item>
        </CheckboxGroup.Root>
      </Box>

      <Separator className="my-4 sm:my-6 bg-border/30" />

      <Box className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <MapPin className="w-4 h-4 text-white" />
          <Text size={{ initial: "2", sm: "3" }} className="text-white font-semibold">
            Work Location
          </Text>
        </div>
        <RadioGroup.Root
          value={employementType}
          onValueChange={setEmployementType}
          className="flex flex-col gap-2 sm:gap-3"
        >
          <RadioGroup.Item 
            value="all"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            All Locations
          </RadioGroup.Item>
          <RadioGroup.Item 
            value="remote"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            Remote
          </RadioGroup.Item>
          <RadioGroup.Item 
            value="on-site"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            On-site
          </RadioGroup.Item>
          <RadioGroup.Item 
            value="hybrid"
            className="text-foreground-secondary hover:text-white transition-colors"
          >
            Hybrid
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Box>

      <Separator className="my-4 sm:my-6 bg-border/30" />

      <Box className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <DollarSign className="w-4 h-4 text-white" />
          <Text size={{ initial: "2", sm: "3" }} className="text-white font-semibold">
            Salary Range
          </Text>
        </div>
        <Flex justify="between" align="center" className="mb-3 sm:mb-4">
          <Text size="2" className="text-foreground-muted">
            Min Salary
          </Text>
          <Text size={{ initial: "2", sm: "3" }} className="text-white font-semibold">
            ${salary.toLocaleString()}
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
          <Flex justify="between" className="mt-3 text-xs">
            <Text size="1" className="text-foreground-muted">
              $2,000
            </Text>
            <Text size="1" className="text-foreground-muted">
              $20,000
            </Text>
          </Flex>
        </Box>
      </Box>

      <Separator className="my-6 sm:my-8 bg-border/30" />

      <Button
        onClick={handleApply}
        size={{ initial: "2", sm: "3" }}
        className="w-full btn-primary py-3 sm:py-4 rounded-xl"
      >
        Apply Filters
      </Button>
    </Box>
  );
};
