"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Box,
  Card,
  Container,
  Flex,
  Text,
  Heading,
  Link,
} from "@radix-ui/themes";
import { Mail, Lock, User } from "lucide-react";

const SignUpPage = () => {
  const [name, setName] = useState("");
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
      const userData = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      });

      const data = await userData.json();

      if (data.success) {
        const redirectPath = data?.redirectTo || "/jobs";
        router.push(redirectPath);
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
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
                Welcome
              </Heading>
              <Text size={{ initial: "2", sm: "3" }} style={{ color: "var(--foreground-muted)" }}>
                Create your JobFinder account
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
                    Name
                  </Text>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                </Box>{" "}
                <button
                  type="submit"
                  className="btn-primary w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </Flex>
            </form>

            <Box className="text-center">
              <Text size="2" style={{ color: "var(--foreground-muted)" }}>
                Already have an account?{" "}
                <Link
                  href="/login"
                  style={{ color: "var(--foreground)" }}
                  className="font-medium hover:opacity-80 transition-colors"
                >
                  Login Here
                </Link>
              </Text>
            </Box>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default SignUpPage;
