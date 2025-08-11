"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField
} from "@radix-ui/themes";
import { Building2, ArrowLeft } from "lucide-react";

export default function AddCompanyPage() {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return setError("Company name is required");
    if (!formData.description.trim()) return setError("Company description is required");

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim()
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetch("/api/user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "EMPLOYEER" }),
        });

        router.push("/company");
      } else {
        setError("Failed to create company. Please try again.");
      }
    } catch (err) {
      console.error("Error creating company:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="2" className="py-6 sm:py-10 px-4">
      <Box className="max-w-xl mx-auto">
       
        <Flex align="center" gap="3" mb="6">
          <Button
            variant="ghost"
            size="2"
            onClick={() => router.back()}
            className="p-1 hover:bg-[var(--color-surface-hover)] rounded-full"
          >
            <ArrowLeft size={18} />
          </Button>
          <Flex align="center" gap="2">
            <Building2 size={22} className="text-[var(--color-accent)]" />
            <Heading size={{ initial: "4", sm: "5" }} className="text-[var(--color-foreground)]">
              Add Company
            </Heading>
          </Flex>
        </Flex>

      
        <Card className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
          <Box p="4" className="sm:p-5">
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="4">
              
                <Box>
                  <Text
                    as="label"
                    size="2"
                    className="text-[var(--color-foreground-secondary)] mb-1 block"
                  >
                    Company Name *
                  </Text>
                  <TextField.Root
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    size="3"
                    className="w-full"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--color-border)",
                      color: "var(--color-foreground)"
                    }}
                  />
                </Box>

             
                <Box>
                  <Text
                    as="label"
                    size="2"
                    className="text-[var(--color-foreground-secondary)] mb-1 block"
                  >
                    Company Description *
                  </Text>
                  <TextArea
                    placeholder="Briefly describe your company..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className="w-full resize-none"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "var(--color-border)",
                      color: "var(--color-foreground)"
                    }}
                  />
                  <Text size="1" className="text-[var(--color-muted)] mt-1">
                    {formData.description.length}/500 characters
                  </Text>
                </Box>

             
                {error && (
                  <Box className="bg-red-900/20 border border-red-800 rounded-md p-3">
                    <Text size="2" className="text-red-400">
                      {error}
                    </Text>
                  </Box>
                )}

                
                <Flex gap="3" justify="end" mt="2" className="flex-col sm:flex-row">
                  <Button
                    type="button"
                    variant="soft"
                    color="gray"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !formData.name.trim() ||
                      !formData.description.trim()
                    }
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white w-full sm:w-auto"
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}
