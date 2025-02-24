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
import { addhealth } from "../../Redux/Slices/healthSlice";
import { getcowsDetails } from "../../Redux/Slices/cowSlice";

export default function Addhealth() {
  const toast = useToast();
  const [value, setValue] = useState("buffalo");
  const [name, setName] = useState({ firstName: "", lastName: "" });

  const [formhealthData, setformhealthData] = useState({
    cowId: null,
    duedate:"",
    dateTime: "",
  });

  const dispatch = useDispatch();
  const { cowData } = useSelector((state) => state.cow);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.health);

  useEffect(() => {
    
    dispatch(getcowsDetails(token));
  }, [dispatch, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cowId") {
      const selectedUser = cowData.find((user) => user._id === value);
      if (selectedUser) {
        let [firstName, lastName] = selectedUser.name.split(" ");
        setName({ firstName, lastName });
      }
    }

    setformhealthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlehealthSubmit = (e) => {
    e.preventDefault();

    dispatch(addhealth({ value: formhealthData, token })).then((res) => {
      if (res.status === 201) {
        toast({
          title: "Report Added Successfully.",
          description: "We've added cattle health report.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        setformhealthData({
          cowId: null,
          duedate:"",
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
            Add Report
            <Box display={"flex"} justifyContent={"center"}>
              <GiCow />
            </Box>
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handlehealthSubmit}>
            <Stack spacing={4}>
              {/* Select cow */}
              <FormControl isRequired>
                <FormLabel>Select Cattle</FormLabel>
                <Select name="cowId" placeholder="Select Cattle" onChange={handleChange}>
                  {cowData &&
                    cowData.map((user) => (
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

              {/* health Category */}
              

              {/* Liter */}
              <FormControl isRequired>
                <FormLabel>Health</FormLabel>
                <Input type="text" name="title" value={formhealthData.title} onChange={handleChange} />
              </FormControl>

              {/* Date & Time */}
              <FormControl isRequired>
                <FormLabel>Select Date & Time</FormLabel>
                <Input type="datetime-local" name="dateTime" value={formhealthData.dateTime} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <FormLabel>Select DUE Date & Time</FormLabel>
                <Input type="datetime-local" name="duedate" value={formhealthData.duedate} onChange={handleChange} />
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
                  ADD REPORT
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
