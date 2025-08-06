import Link from 'next/link';
import { Box, Heading, Text, Button, Container, Flex } from '@radix-ui/themes';

const HomePage = () => {

  return (
    <Box className="w-full min-h-screen bg-gray-900 text-white">
      <Container size="3" className="flex min-h-screen flex-col items-center justify-center p-8">
        <Flex direction="column" align="center" gap="6" className="max-w-4xl">
          <Heading 
            size="9" 
            className="text-center text-white mb-4"
            style={{ lineHeight: '1.1' }}
          >
            Welcome to Job Finder
          </Heading>
          
          <Text 
            size="5" 
            className="text-gray-300 text-center max-w-2xl leading-relaxed"
          >
            Your one-stop solution for finding the perfect job. Search thousands of 
            listings tailored to your skills and location.
          </Text>
          
          <Link href='/signup' className="mt-6">
            <Button 
              size="4" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
               Sign up to continue
            </Button>
          </Link>
          
        </Flex>
      </Container>
    </Box>
  );
}


export default HomePage;
