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
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError("Company name is required");
      return;
    }
    
    if (!formData.description.trim()) {
      setError("Company description is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim()
        }),
      });

      const result = await response.json();

      if (result.success) {
       
        router.push("/company");
      } else {
        setError("Failed to create company. Please try again.");
      }
    } catch (error) {
      console.error("Error creating company:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container size="2" className="py-8">
      <Box className="max-w-2xl mx-auto">
        {/* Header */}
        <Flex align="center" gap="4" mb="6">
          <Button 
            variant="ghost" 
            size="2" 
            onClick={handleGoBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Button>
          <Box>
            <Flex align="center" gap="3" mb="2">
              <Building2 size={24} className="text-blue-500" />
              <Heading size="6" className="text-white">
                Add Your Company
              </Heading>
            </Flex>
            <Text size="2" className="text-gray-400">
              Create your company profile to start posting jobs
            </Text>
          </Box>
        </Flex>

        {/* Form Card */}
        <Card className="bg-gray-800 border-gray-700">
          <Box p="6">
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="5">
                {/* Company Name */}
                <Box>
                  <Text as="label" size="2" weight="medium" className="text-white mb-2 block">
                    Company Name *
                  </Text>
                  <TextField.Root
                    placeholder="Enter your company name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    size="3"
                    className="w-full"
                    style={{
                      backgroundColor: 'rgb(55, 65, 81)',
                      borderColor: 'rgb(75, 85, 99)',
                      color: 'white'
                    }}
                  />
                </Box>

                {/* Company Description */}
                <Box>
                  <Text as="label" size="2" weight="medium" className="text-white mb-2 block">
                    Company Description *
                  </Text>
                  <TextArea
                    placeholder="Describe your company, its mission, values, and what makes it unique..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={6}
                    className="w-full resize-none"
                    style={{
                      backgroundColor: 'rgb(55, 65, 81)',
                      borderColor: 'rgb(75, 85, 99)',
                      color: 'white'
                    }}
                  />
                  <Text size="1" className="text-gray-500 mt-1">
                    {formData.description.length}/500 characters
                  </Text>
                </Box>

                {/* Error Message */}
                {error && (
                  <Box className="bg-red-900/20 border border-red-800 rounded-md p-3">
                    <Text size="2" className="text-red-400">
                      {error}
                    </Text>
                  </Box>
                )}

                {/* Submit Button */}
                <Flex gap="3" justify="end" mt="4">
                  <Button
                    type="button"
                    variant="soft"
                    color="gray"
                    size="3"
                    onClick={handleGoBack}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="3"
                    disabled={isLoading || !formData.name.trim() || !formData.description.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? "Creating..." : "Create Company"}
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Card>

        {/* Additional Info */}
        <Box mt="6" className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <Heading size="3" className="text-white mb-3">
            What happens next?
          </Heading>
          <Flex direction="column" gap="2">
            <Text size="2" className="text-gray-300">
              • Your company profile will be created and visible to job seekers
            </Text>
            <Text size="2" className="text-gray-300">
              • You'll be able to post job openings under your company
            </Text>
            <Text size="2" className="text-gray-300">
              • Job seekers can learn more about your company when viewing your jobs
            </Text>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
}
