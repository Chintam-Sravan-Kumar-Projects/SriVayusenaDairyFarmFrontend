import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputLeftAddon,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { GiCow } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcustomer, getcustomersDetails } from "../../Redux/Slices/customerSlice";

export default function UserRegistration({ onClose }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { usersData, loading } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male", // Default
    village: "",
    mobile: "",
    email: "",
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle gender selection
  const handleGenderChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      gender: val,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.village) {
      toast({
        position: "top",
        title: "401 Field Error..!",
        description: "Please fill all required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let customerData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      await dispatch(addcustomer({ value: customerData, token }));
      await dispatch(getcustomersDetails(token));

      toast({
        title: "Success!",
        description: "Customer added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        firstName: "",
        lastName: "",
        gender: "Male",
        village: "",
        mobile: "",
        email: "",
      });

      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to add customer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Customer
            <Box display={"flex"} justifyContent={"center"}>
              <GiCow />
            </Box>
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Box>
              </HStack>

              {/* Gender */}
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={handleGenderChange} value={formData.gender}>
                  <Stack direction="row">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {/* Email */}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="user-email@example.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              {/* Mobile */}
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>

              {/* Village */}
              <FormControl id="village" isRequired>
                <FormLabel>Village Name</FormLabel>
                <Input
                  placeholder="Village name"
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                />
              </FormControl>

              {/* Submit Button */}
              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  isLoading={loading}
                  loadingText="Submitting"
                  type="submit"
                  _hover={{ bg: "blue.500" }}
                >
                  {loading ? "Submitting..." : "Add Milk Provider"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
