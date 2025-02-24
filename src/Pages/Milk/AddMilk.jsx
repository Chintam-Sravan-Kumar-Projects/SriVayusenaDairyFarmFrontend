import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Text,
  useColorModeValue,
  Select,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";

import { GiBuffaloHead, GiCow } from "react-icons/gi";
import { addMilk } from "../../Redux/Slices/milkSlice";
import { getcustomersDetails } from "../../Redux/Slices/customerSlice";

export default function AddMilk() {
  const toast = useToast();
  const [value, setValue] = useState("buffalo");
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const [formMilkData, setformMilkData] = useState({
    customerId: null,
    category: "buffalo", // Options: cow, buffalo, goat
    fat: 0,
    snf: 0,
    water: 0,
    litter: 0,
    degree: 0,
    dateTime: "",
  });

  const dispatch = useDispatch();
  const { customerData } = useSelector((state) => state.customer);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.milk);

  useEffect(() => {
    dispatch(getcustomersDetails(token));
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customerId") {
      const selectedUser = customerData.find((user) => user._id === value);
      if (selectedUser) {
        let [firstName, lastName] = selectedUser.name.split(" ");
        setName({ firstName, lastName });
      }
    }

    setformMilkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMilkSubmit = (e) => {
    e.preventDefault();

    dispatch(addMilk({ value: formMilkData, token })).then((res) => {
      if (res.status === 201) {
        toast({
          title: "Milk Added Successfully.",
          description: "We've added your milk to your account.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setformMilkData({
          customerId: null,
          category: "buffalo",
          fat: 0,
          snf: 0,
          water: 0,
          litter: 0,
          degree: 0,
          dateTime: "",
        });
      }
    });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Milk
            <Box display={"flex"} justifyContent={"center"}>
              <GiCow />
            </Box>
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleMilkSubmit}>
            <Stack spacing={4}>
              {/* Select Customer */}
              <FormControl isRequired>
                <FormLabel>Select Customer</FormLabel>
                <Select name="customerId" placeholder="Select Customer" onChange={handleChange}>
                  {customerData &&
                    customerData.map((user) => (
                      <option value={user._id} key={user._id}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              {/* First & Last Name */}
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={name.firstName} readOnly />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={name.lastName} readOnly />
                  </FormControl>
                </Box>
              </HStack>

              {/* Milk Category */}
              <FormControl isRequired>
                <FormLabel>Milk Category</FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row" spacing={"2rem"}>
                    <Radio value="Buffalo" name="category" onChange={handleChange}>
                      <GiBuffaloHead /> Buffalo
                    </Radio>
                    <Radio value="Cow" name="category" onChange={handleChange}>
                      <GiCow /> Cow
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {/* Liter */}
              <FormControl isRequired>
                <FormLabel>Liter</FormLabel>
                <Input type="number" name="litter" value={formMilkData.litter} onChange={handleChange} />
              </FormControl>

              {/* Date & Time */}
              <FormControl isRequired>
                <FormLabel>Select Date & Time</FormLabel>
                <Input type="datetime-local" name="dateTime" value={formMilkData.dateTime} onChange={handleChange} />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  isLoading={loading}
                  loadingText="Submitting"
                  _hover={{ bg: "blue.600" }}
                >
                  Submit Milk
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
