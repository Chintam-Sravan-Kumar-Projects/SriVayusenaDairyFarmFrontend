import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  RadioGroup,
  Radio,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { GiCow } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addcow, getcowsDetails } from "../../Redux/Slices/cowSlice";

export default function CowRegistration({ onClose }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { cowsData, loading } = useSelector((state) => state.cow);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    village: "",
    category: "Cow", // Default selection
  });

  // Handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category change
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.village || !formData.category) {
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

    let cowData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    };

    try {
      await dispatch(addcow({ value: cowData, token }));
      await dispatch(getcowsDetails(token));

      toast({
        title: "Success!",
        description: "Cattle added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        firstName: "",
        lastName: "",
        village: "",
        category: "Cow",
      });

      onClose();
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to add cattle.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH={"10vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Cattle
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

              {/* Category (Cow/Buffalo) */}
              <FormControl id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <RadioGroup onChange={handleCategoryChange} value={formData.category}>
                  <Stack direction="row">
                    <Radio value="Cow">Cow</Radio>
                    <Radio value="Buffalo">Buffalo</Radio>
                  </Stack>
                </RadioGroup>
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
                  {loading ? "Submitting..." : "Add Cattle"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
