'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  Container,
  Flex, 
  Text, 
  TextField, 
  Heading,
  Separator,
  Link
} from "@radix-ui/themes";

const SignUpPage = () => {
    const[name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try{
        const userData = await fetch('/api/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
            credentials : 'include'
        })
        
        const data = await userData.json();
        console.log(data);
        
        if(data.success){
            // Use the redirectTo field from API response, fallback to /jobs
            const redirectPath = data?.redirectTo || '/jobs';
            router.push(redirectPath);
        } else {
            setError(data?.message || 'Signup failed. Please try again.');
        }
    }
    catch(error){
        console.log(error);
        setError('Something went wrong. Please try again.');
    }
    finally{
        setIsLoading(false);
    }
  }
    console.log(email, password);


  return (
    <Box className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Container size="1" className="w-full max-w-md mx-auto mt-20">
        <Card size="4" className="bg-gray-800 border border-gray-700 shadow-2xl">
          <Flex direction="column" gap="6">
            {/* Header */}
            <Box className="text-center">
              <Heading size="6" className="text-white mb-2">
                Welcome
              </Heading>
              <Text size="3" className="text-gray-400">
                Create your JobFinder account
              </Text>
            </Box>
            
           
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="4">
                {/* Error Message */}
                {error && (
                  <Box className="p-3 bg-red-900/50 border border-red-700 rounded-md">
                    <Text size="2" className="text-red-300">
                      {error}
                    </Text>
                  </Box>
                )}

                <Box>
                  <Text as="label" size="2" weight="medium" className="text-white mb-2 block">
                    Name
                  </Text>
                  <TextField.Root
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="3"
                    className="w-full"
                    required
                  />
                </Box>

                <Box>
                  <Text as="label" size="2" weight="medium" className="text-white mb-2 block">
                    Email Address
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="3"
                    className="w-full"
                    required
                  />
                </Box>

               
                <Box>
                  <Text as="label" size="2" weight="medium" className="text-white mb-2 block">
                    Password
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="3"
                    className="w-full"
                    required
                  />
                </Box>

            
                {/* Submit Button */}
                <Button 
                  type="submit"
                  variant="solid" 
                  size="3"
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </Button>
              </Flex>
            </form>
            
            <Box className="text-center">
              <Text size="2" className="text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Login Here
                </Link>
              </Text>
            </Box>
      
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}

export default SignUpPage;
