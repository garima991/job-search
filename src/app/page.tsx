import Link from 'next/link';
import { Box, Heading, Text, Button, Container, Flex, Grid, Card, Badge } from '@radix-ui/themes';
import { Search, Building, Star, Users, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Job Search",
      description: "Advanced filtering and search algorithms to find the perfect match for your skills and preferences."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Company Insights",
      description: "Get detailed information about companies, their culture, and employee reviews before applying."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Save & Track",
      description: "Save your favorite jobs and track your application progress with our intuitive dashboard."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Direct Apply",
      description: "Apply to jobs directly through our platform with a streamlined application process."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Jobs" },
    { number: "500+", label: "Companies" },
    { number: "50K+", label: "Happy Users" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <Box className="w-full min-h-screen bg-black text-white">

      <Container size="3" className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative">

        <Flex direction="column" align="center" gap="6 sm:gap-8" className="max-w-5xl relative z-10">
          <Badge size="3" className="bg-white/20 text-white border-white/30 px-3 sm:px-4 py-2 mb-2 sm:mb-4 text-center">
            🚀 Find Your Dream Job Today
          </Badge>
          
          <Heading 
            size={{ initial: "7", sm: "8", lg: "9" }}
            className="text-center text-white mb-4 sm:mb-6 leading-tight px-4"
            style={{ lineHeight: '1.1' }}
          >
            Your Gateway to
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> Amazing Careers</span>
          </Heading>
          
          <Text 
            size={{ initial: "3", sm: "4", lg: "5" }}
            className="text-gray-300 text-center max-w-3xl leading-relaxed mb-6 sm:mb-8 px-4"
          >
            Discover thousands of opportunities from top companies worldwide. 
          </Text>
          
          <Flex gap="3 sm:gap-4" wrap="wrap" justify="center" className="mb-8 sm:mb-12 px-4">
            <Link href='/signup'>
              <Button 
                size={{ initial: "3", sm: "4" }}
                className="bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
              >
                 Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href='/search'>
              <Button 
                size={{ initial: "3", sm: "4" }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Browse Jobs
              </Button>
            </Link>
          </Flex>

       
          <Grid columns={{ initial: "1", sm: "2", lg: "4" }} gap="4 sm:gap-6" className="w-full max-w-4xl px-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 p-4 sm:p-6 text-center backdrop-blur-sm">
                <Text size={{ initial: "5", sm: "6" }} weight="bold" className="text-white mb-2">
                  {stat.number}
                </Text>
                <Text size={{ initial: "2", sm: "3" }} className="text-gray-400">
                  {stat.label}
                </Text>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>

  
      <Box className="py-12 sm:py-16 lg:py-20 bg-gray-900/30">
        <Container size="3" className="p-4 sm:p-6 lg:p-8">
          <Flex direction="column" align="center" gap="8 sm:gap-12">
            <div className="text-center max-w-3xl px-4">
              <Heading size={{ initial: "6", sm: "7", lg: "8" }} className="mb-4">
                Why Choose Job Finder?
              </Heading>
              <Text size={{ initial: "3", sm: "4" }} className="text-gray-400">
                We've built the most comprehensive job search platform to help you find your perfect career match.
              </Text>
            </div>

            <Grid columns={{ initial: "1", sm: "2", lg: "4" }} gap="4 sm:gap-6" className="w-full">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-700 p-4 sm:p-6 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm group">
                  <div className="bg-white/20 p-3 rounded-lg w-fit mb-4 group-hover:bg-white/30 transition-colors">
                    {feature.icon}
                  </div>
                  <Heading size={{ initial: "3", sm: "4" }} className="mb-3">
                    {feature.title}
                  </Heading>
                  <Text size={{ initial: "2", sm: "3" }} className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </Text>
                </Card>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Box>

  
      <Box className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-white/10 to-gray-400/10">
        <Container size="3" className="p-4 sm:p-6 lg:p-8">
          <Flex direction="column" align="center" gap="6 sm:gap-8" className="max-w-4xl mx-auto text-center">
            <Heading size={{ initial: "6", sm: "7", lg: "8" }} className="mb-4 px-4">
              Ready to Start Your Journey?
            </Heading>
            <Text size={{ initial: "3", sm: "4" }} className="text-gray-300 mb-6 sm:mb-8 max-w-2xl px-4">
              Join thousands of professionals who have found their dream jobs through our platform. 
              Your next career move is just a click away.
            </Text>
            
            <Flex gap="3 sm:gap-4" wrap="wrap" justify="center" className="px-4">
              <Link href='/signup'>
                <Button 
                  size={{ initial: "3", sm: "4" }}
                  className="bg-gradient-to-r from-white to-gray-300 hover:from-gray-200 hover:to-gray-400 text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                >
                  Create Free Account
                  <CheckCircle className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link href='/login'>
                <Button 
                  size={{ initial: "3", sm: "4" }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
