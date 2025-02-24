import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addexpense } from "../../Redux/Slices/expensesSlice";
import {getexpenseDetails} from "../../Redux/Slices/expensesSlice";

export default function AddExpense() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.expense);
  
  const [formExpenseData, setFormExpenseData] = useState({
    description: "",
    rate: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to add an expense.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    try {
      const res = await dispatch(addexpense({ value: formExpenseData, token })).unwrap();
      
      if (res.message === "expense data submitted") {
        toast({
          title: "Expense Added Successfully",
          description: "Your expense has been recorded.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
  
        // Option 1: Re-fetch the expenses to ensure valid keys are present.
        dispatch(getexpenseDetails({ token }));
  
        // Option 2 (if re-fetch is not an option): Assign a temporary ID if missing.
        // You might update the new expense in your Redux slice accordingly.
  
        setFormExpenseData({
          description: "",
          rate: "",
          dateTime: "",
        });
      } else {
        toast({
          title: "Failed to Add Expense",
          description: res?.data?.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to add expense.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Expense
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Record your expenses easily ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleExpenseSubmit}>
            <Stack spacing={4}>
              {/* Expense Description */}
              <FormControl isRequired>
                <FormLabel>Expense Description</FormLabel>
                <Input type="text" name="description" value={formExpenseData.description} onChange={handleChange} />
              </FormControl>

              {/* Rate */}
              <FormControl isRequired>
                <FormLabel>Rate</FormLabel>
                <Input type="number" name="rate" value={formExpenseData.rate} onChange={handleChange} />
              </FormControl>

              {/* Date & Time */}
              <FormControl isRequired>
                <FormLabel>Select Date & Time</FormLabel>
                <Input type="datetime-local" name="dateTime" value={formExpenseData.dateTime} onChange={handleChange} />
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
                  Submit Expense
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
