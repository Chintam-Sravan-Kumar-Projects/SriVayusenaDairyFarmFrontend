import React, { useContext, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiSettings, FiMenu, FiChevronDown } from "react-icons/fi";
import { FaRegAddressCard, FaMoneyBillWave,FaHeartbeat } from "react-icons/fa";
import { GiCow } from "react-icons/gi";
import { MdCurrencyRupee } from "react-icons/md";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import MyContext from "./ContextApi/MyContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";
import brandLogo from "../assets/Logo/logo.png";
import projectLogo from "../assets/Logo/logo.png";

const LinkItems = [
  {
    id: "1",
    name: "Milk Selling",
    icon: FiHome,
    children: [
      { id: "1-1", name: "Sell Milk", icon: FiHome, path: "/dashboard/add_milk" },
      { id: "1-2", name: "Customers", icon: FaRegAddressCard, path: "/dashboard/user_dashboard" },
      { id: "1-3", name: "Sold Milk Stats", icon: FiTrendingUp, path: "/dashboard/milk_info" },
      { id: "1-4", name: "Settings", icon: FiSettings, path: "/dashboard/rate" },
    ],
  },
  {
    id: "2",
    name: "Farm",
    icon: GiCow,
    children: [
      { id: "2-1", name: "Add Milk", icon: FiHome, path: "/dashboard/add_producedmilk" },
      { id: "2-2", name: "Cattles", icon: GiCow, path: "/dashboard/cow_dashboard" },
      { id: "2-3", name: "Milk Stats", icon: FiTrendingUp, path: "/dashboard/producedmilk_info" },
    ],
  },
  {
    id: "3",
    name: "Expenses",
    icon: FaMoneyBillWave,
    children: [
      { id: "3-1", name: "Add Expenses", icon: MdCurrencyRupee, path: "/dashboard/add_expense" },
      { id: "3-2", name: "Track Expenses", icon: FaMoneyBillWave, path: "/dashboard/expense" },
    ],
  },
  {
    id: "4",
    name: "Health Report",
    icon: FaHeartbeat,
    children: [
      { id: "4-1", name: "Cattles", icon: GiCow, path: "/dashboard/cow_dashboard" },
      { id: "4-2", name: "Add Report", icon: FaHeartbeat, path: "/dashboard/add_report" },
      { id: "4-3", name: "Report Stats", icon: FiTrendingUp, path: "/dashboard/report_info" },
    ],
  },
];

export default function Dashboard({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Optional: if you want to auto-fetch any user data here, add useEffect

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Sidebar for desktop */}
      <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
      
      {/* Drawer for mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      {/* Mobile navigation */}
      <MobileNav onOpen={onOpen} />

      {/* Main content container */}
      <Box ml={{ base: 0, md: 60 }} p="4" overflowY="auto" maxH="100vh">
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box bg={useColorModeValue("white", "gray.900")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="cyan.600" fontFamily="'Pacifico', cursive">
          Dashboard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) =>
        link.children ? (
          <Box key={link.id}>
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              cursor="pointer"
              color="cyan.600"
              fontFamily="Helvetica, Arial, sans-serif"
              fontWeight="bold"
              onClick={() => toggleDropdown(link.id)}
            >
              <Icon as={link.icon} mr="4" />
              {link.name}
              <Icon as={FiChevronDown} ml="auto" transform={openDropdowns[link.id] ? "rotate(180deg)" : "rotate(0deg)"} />
            </Flex>
            <Collapse in={openDropdowns[link.id]} animateOpacity>
              {link.children.map((child) => (
                <NavItem key={child.id} path={child.path} icon={child.icon} ml="10" color="cyan.400" fontWeight="bold" fontFamily="Helvetica, Arial, sans-serif">
                  {child.name}
                </NavItem>
              ))}
            </Collapse>
          </Box>
        ) : (
          <NavItem key={link.id} path={link.path} icon={link.icon}>
            {link.name}
          </NavItem>
        )
      )}
    </Box>
  );
};

const NavItem = ({ icon, path, children, ml = "0", ...rest }) => {
  const { globalState, setGlobalState } = useContext(MyContext);
  const location = useLocation();
  return (
    <NavLink to={path} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        ml={ml}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout(token));
    // Optionally navigate to sign in page after logout
    navigate("/admin/signin");
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/admin/signin");
    }
  }, [token, user, navigate]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end"}}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        <Link to="/">
          <Image onClick={() => navigate("/")} w="3rem" borderRadius="1.5rem" src={brandLogo} alt="logo" />
        </Link>
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack spacing={{ base: "0", md: "6" }} mr={{ base: 0, md: 8 }}>
                <Avatar size={"sm"} src={projectLogo} />
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{user ? user.name : "User"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>{user ? "Sign out" : ""}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
