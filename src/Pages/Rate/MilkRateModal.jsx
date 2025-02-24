import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useToast,
} from "@chakra-ui/react";

const MilkRateModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [milkCategory, setMilkCategory] = useState(initialData?.milkCategory || 'cow');
  const [ratePerFat, setRatePerFat] = useState(initialData?.ratePerFat || "");
  const [status, setStatus] = useState(initialData?.status || 'Active');

  const toast = useToast();

  const handleSave = () => {
    if (!milkCategory || !ratePerFat) {
      toast({
        title: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSave({
     
      milkCategory,
      ratePerFat,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? "Edit" : "Add"} Milk Rate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Select Category"
            defaultValue={'cow'}
            value={milkCategory}
            onChange={(e) => setMilkCategory(e.target.value)}
          >
            <option value="Cow">Cow</option>
            <option value="Buffalo">Buffalo</option>
          </Select>

          <Input
            mt={4}
            placeholder="Rate (₹)"
            value={ratePerFat}
            onChange={(e) => setRatePerFat(e.target.value)}
          />

        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MilkRateModal;
