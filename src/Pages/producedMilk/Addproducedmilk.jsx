import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { GiBuffaloHead, GiCow } from "react-icons/gi";
import { addproducedmilk } from "../../Redux/Slices/producedmilkSlice";
import { getcowsDetails } from "../../Redux/Slices/cowSlice";

export default function Addproducedmilk() {
  const toast = useToast();
  const [value, setValue] = useState("buffalo");
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  const [formproducedmilkData, setformproducedmilkData] = useState({
    cowId: null,
    category: "buffalo",
    fat: 0,
    snf: 0,
    water: 0,
    litter: 0,
    degree: 0,
    id: "",
    dateTime: "", // Added dateTime field
  });

  const dispatch = useDispatch();
  const { cowData } = useSelector((state) => state.cow);
  const { token, user } = useSelector((state) => state.auth);
  const { data, loading, error } = useSelector((state) => state.producedmilk);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cowId") {
      cowData.forEach((user) => {
        if (user._id === value) {
          let [firstName, lastName] = user.name.split(" ");
          setName({ firstName, lastName });
          setformproducedmilkData({ ...formproducedmilkData, cowId: value });
        }
      });
    } else {
      setformproducedmilkData({
        ...formproducedmilkData,
        [name]: value,
      });
    }
  };

  // Submit form data
  const handleproducedmilkSubmit = (e) => {
    e.preventDefault();

    dispatch(addproducedmilk({ value: formproducedmilkData, token })).then(
      (res) => {
        if (res.status === 201) {
          toast({
            title: "Milk Added Successfully.",
            description: "We've added your milk to your account.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    );

    setformproducedmilkData({
      cowId: null,
      category: "buffalo",
      fat: 0,
      snf: 0,
      water: 0,
      litter: 0,
      degree: 0,
      dateTime: "",
    });
    setName({ firstName: "", lastName: "" });
  };

  useEffect(() => {
    dispatch(getcowsDetails(token));
  }, []);

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
          <form onSubmit={handleproducedmilkSubmit}>
            <Stack spacing={4}>
              {/* Select cow */}
              <FormControl colSpan={[6, 3]} isRequired>
                <FormLabel>Select Cattle</FormLabel>
                <Select
                  name="cowId"
                  placeholder="Select Cattle"
                  value={formproducedmilkData.cowId || ""}
                  onChange={handleChange}
                >
                  {cowData &&
                    cowData.map((user) => (
                      <option value={user._id} key={user._id}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <HStack>
                {/* First Name */}
                <Box>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={name.firstName} readOnly />
                  </FormControl>
                </Box>
                {/* Last Name */}
                <Box>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={name.lastName} readOnly />
                  </FormControl>
                </Box>
              </HStack>

              {/* Milk Category */}
              {/* <FormControl>
                <FormLabel>Milk Category</FormLabel>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="row" spacing={"2rem"}>
                    <Radio value="buffalo" onChange={handleChange} checked={formproducedmilkData.category === "buffalo"}>
                      <GiBuffaloHead /> Buffalo
                    </Radio>
                    <Radio value="cow" onChange={handleChange} checked={formproducedmilkData.category === "cow"}>
                      <GiCow /> Cow
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl> */}

              {/* Liter */}
              <FormControl isRequired>
                <FormLabel>Liter</FormLabel>
                <Input type="number" name="litter" value={formproducedmilkData.litter} onChange={handleChange} />
              </FormControl>

              {/* Date & Time Picker */}
              <FormControl isRequired>
                <FormLabel>Date & Time</FormLabel>
                <Input type="datetime-local" name="dateTime" value={formproducedmilkData.dateTime} onChange={handleChange} />
              </FormControl>

              <Stack spacing={10} pt={2}>
                {loading ? (
                  <Button size="lg" bg={"blue.400"} color={"white"} isLoading _hover={{ bg: "blue.600" }}>
                    Submitting...
                  </Button>
                ) : (
                  <Button size="lg" bg={"blue.400"} color={"white"} type="submit" _hover={{ bg: "blue.600" }}>
                    Submit Milk
                  </Button>
                )}
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
