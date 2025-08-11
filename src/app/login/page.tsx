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
  Heading,
  Separator,
  Link
} from "@radix-ui/themes";
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (data?.success) {
        const redirectPath = data?.redirectTo || '/jobs';
        router.push(redirectPath);
      } else {
        setError(data?.message || 'Login failed. Please try again.');
      }
    }
    catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{ background: "var(--background)" }}
    >
      <Container size="1" className="w-full max-w-md mx-auto fade-in">

        <Card size="4" className="modern-card relative z-10">
          <Flex direction="column" gap="4 sm:gap-6">

            <Box className="text-center">
              <Heading
                size={{ initial: "5", sm: "6" }}
                style={{ color: "var(--foreground)" }}
                className="mb-2"
              >
                Welcome Back
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} style={{ color: "var(--foreground-muted)" }}>
                Sign in to your JobFinder account
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="3 sm:gap-4">

                {error && (
                  <Box
                    className="rounded-md p-3"
                    style={{
                      background: "rgba(255,0,0,0.1)",
                      border: "1px solid rgba(255,0,0,0.3)",
                    }}
                  >
                    <Text size="2" style={{ color: "var(--accent)" }}>
                      {error}
                    </Text>
                  </Box>
                )}

                <Box>
                  <Text
                    as="label"
                    size="2"
                    weight="medium"
                    style={{ color: "var(--foreground)" }}
                    className="mb-2 block"
                  >
                    Email Address
                  </Text>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="modern-input w-full pl-10 pr-4"
                    required
                  />

                </Box>


                <Box>
                  <Text
                    as="label"
                    size="2"
                    weight="medium"
                    style={{ color: "var(--foreground)" }}
                    className="mb-2 block"
                  >
                    Password
                  </Text>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="modern-input w-full pl-10 pr-4"
                    required
                  />

                </Box>

                <button
                  type="submit"
                  className="btn-primary w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </Flex>
            </form>

            <Box className="text-center">
              <Text size="2" style={{ color: "var(--foreground-muted)" }}>
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  style={{ color: "var(--foreground)" }}
                  className="font-medium hover:opacity-80 transition-colors"
                >
                  Sign up here
                </Link>
              </Text>
            </Box>

          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
