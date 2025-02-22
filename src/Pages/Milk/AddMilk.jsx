import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Link,
  InputLeftAddon,
  RadioGroup,
  Radio,
  Select,
  GridItem,
  useToast ,
} from "@chakra-ui/react";

import { GiBuffaloHead, GiCow, GiFarmer, GiGoat } from "react-icons/gi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { addMilk } from "../../Redux/Slices/milkSlice";
import { getcustomersDetails } from "../../Redux/Slices/customerSlice";

export default function AddMilk() {
  const toast = useToast()
  const [value, setValue] = useState("buffalo");
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  const [formMilkData, setformMilkData] = useState({
   customerId:null,
    category: "buffalo", //should be [cow,buffalo,goat];
    fat: 0,
    snf: 0,
    water: 0 || 0,
    litter: 0,
    degree:0,
    id:""
    
  });
  const dispatch = useDispatch();
  const { customerData } = useSelector((state) => state.customer);
  const {token,user}=useSelector((state)=>state.auth);

  const {data,loading,error} =useSelector((state)=>state.milk);
  

  const handleChange = (e) => {
   
    const { name, value } = e.target;
   
    // get user name
    if(name=="customerId")
    {
      customerData.forEach((user)=>{
        if(user._id===value)
        {
         
          let [firstName,lastName]=user.name.split(" ");
          
          setName({firstName,lastName});
          setformMilkData.customerId=value;
        }
      })

    }
    setformMilkData({
      ...formMilkData,
      [name]: value,
    });
  };
  
  // add milk
  const handleMilkSubmit = (e) => {
    e.preventDefault();
  
   
    dispatch(addMilk({value:formMilkData,token})).then((res)=>{
      
     
      if(res.status==201)
      {
        
        toast({
          title: 'Milk Added Successfully.',
          description: "We've added your milk to your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position:"top"
        })
      }
    })
    setformMilkData({
   customerId:null,
    category: "cow", //should be [cow,buffalo,goat];
    fat: 0,
    snf: 0,
    water: 0 || 0,
    litter: 0,
    degree:0 || 0,})
    
  };

  useEffect(() => {
    

      dispatch(getcustomersDetails(token)).then((res)=>{
       
      });
    
    // if(isMilkAdded)
    // {
    //   dispatch(addMilkSuccessAction({status:false,response:"initial"}))
    // }
  }, []);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
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
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form action="" onSubmit={handleMilkSubmit}>
            <Stack spacing={4}>
              {/* select customer */}
              <FormControl colSpan={[6, 3]}>
                <FormLabel
                  htmlFor="customer-name"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Select Customer
                </FormLabel>
                <Select
                  id="customer"
                  name="customerId"
                  autoComplete="customer"
                  placeholder="Select Customer"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={(e) => handleChange(e)}
                >
                  {customerData && customerData&&customerData.map((user) => {
                    return (
                      <option value={user._id} key={user._id}>
                        {user.name}
                      </option>
                    );
                  })}

                  {/* <option>Ab</option>
               <option>DB</option> */}
                </Select>
              </FormControl>
              <HStack>
                {/* first name */}
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="first-name"
                      type="text"
                      value={name.firstName}
                      name="firstName"
                      
                    />
                  </FormControl>
                </Box>
                {/* last name */}
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="last-name"
                      type="text"
                      value={name.lastName}
                      name="lastName"
                    />
                  </FormControl>
                </Box>
              </HStack>

              {/* Milk Category */}
              <FormControl>
                <FormLabel>Milk Category</FormLabel>
                <RadioGroup onChange={setValue} value={value} name="category">
                  <Stack direction="row" spacing={"2rem"}>
                    {/* <Radio value="cow" name="category" onChange={handleChange} checked={formMilkData.category=="cow"} >
                      <GiCow />
                      Cow
                    </Radio> */}
                    <Radio value="buffalo" name="category" onChange={handleChange} checked={formMilkData.category=="buffalo"} >
                      <GiBuffaloHead />
                      Buffalo
                    </Radio>
                    {/* <Radio value="goat" name="category" onChange={handleChange} checked={formMilkData.category=="goat"} >
                      <GiGoat />
                      Goat
                    </Radio> */}
                  </Stack>
                </RadioGroup>
              </FormControl>

              {/* liter */}
              <FormControl id="liter" isRequired>
                <FormLabel>Liter</FormLabel>
                <Input placeholder="MILK Liter" type="number" name="litter" value={formMilkData.litter} onChange={handleChange} />
              </FormControl>

              {/* FAT */}
              {/* <FormControl id="fat" isRequired>
                <FormLabel>FAT</FormLabel>
                <Input placeholder="MILK FAT" type="number" name="fat" value={formMilkData.fat} onChange={handleChange} />
              </FormControl> */}

              {/* SNF */}
              {/* <FormControl id="snf">
                <FormLabel>SNF</FormLabel>
                <Input placeholder="MILK SNF" type="number" name="snf" value={formMilkData.snf} onChange={handleChange} />
              </FormControl> */}

              {/* WATER */}
              {/* <FormControl id="water" isRequired>
                <FormLabel>WATER</FormLabel>
                <Input placeholder="MILK WATER" type="number" name="water" value={formMilkData.water} onChange={handleChange} />
              </FormControl> */}


              {/* Degree  */}
              {/* <FormControl id="degree">
                <FormLabel>Degree</FormLabel>
                <Input placeholder="Degree" type="number" name="degree" value={formMilkData.degree} onChange={handleChange} />
              </FormControl> */}

              <Stack spacing={10} pt={2}>
                {loading ? (
                  <Button
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    loadingText="Submitting"
                    isLoading
                    _hover={{
                      bg: "blue.600",
                    }}
                  >
                    Submit Milk
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    loadingText="Submitting"
                    type="submit"
                    _hover={{
                      bg: "blue.600",
                    }}
                  >
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
