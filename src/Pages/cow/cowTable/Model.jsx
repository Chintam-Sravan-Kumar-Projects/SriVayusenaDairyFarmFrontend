"use client"
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import CowRegistration from "../cowRegistration";

export default function Model() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const handleOpen = (backdrop) => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onPress={() => handleOpen()}
          
          endContent={<PlusIcon />}
        >
          Add Cattle
        </Button>
        {/* <Button  
          color="primary" endContent={<PlusIcon />}
           
          
           
            onPress={() => handleOpen()}
            className="capitalize"
          >
           Blur
          </Button> */}
      </div>
      <Modal
      
        size={"4xl"}
        
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={"inside"}
        placement={"top"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cow Registration
              </ModalHeader>
              <ModalBody>
                <CowRegistration onClose={onClose} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                 {`< Back `}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
