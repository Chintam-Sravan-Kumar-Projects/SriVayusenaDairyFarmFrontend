import React, { useState } from "react";
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Text,
	Heading,
	useBreakpointValue,
	Flex,
	useMediaQuery,
	Spacer,
} from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Ensure jsPDF autoTable is imported
import { DownloadIcon } from "@chakra-ui/icons";

const translations = {
	en: {
		date: "Date",
		session: "Session",
		ratePerLiter: "Rate/Liter",
		weight: "Weight",
		totalBonus: "Total Bonus",
		totalWeight: "Total Weight",
		avgRatePerLiter: "Avg. Rate/Liter",
		totalAmount: "Total Amount",
	},
	mr: {
		date: "తేదీ",
		session: "సమయం",
		ratePerLiter: "లీటరుకు రేటు",
		weight: "బరువు",
		totalBonus: "మొత్తం బోనస్",
		totalWeight: "మొత్తం బరువు",
		avgRatePerLiter: "లీటరుకు సగటు రేటు",
		totalAmount: "మొత్తం డబులు",
		morning:'ఉదయం',
		"evening":'సాయంత్రం',
	},
};

const ProducedmilkReportModal = ({ reportData, dateValues }) => {
	
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	const [language, setLanguage] = useState("en");

	const toggleLanguage = () => {
		setLanguage((prevLang) => (prevLang === "en" ? "mr" : "en"));
	};

	const openReportModal = () => setIsReportModalOpen(true);
	const closeReportModal = () => setIsReportModalOpen(false);

	const startDragging = (e) => {
		setIsDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const stopDragging = () => {
		setIsDragging(false);
	};

	const handleDragging = (e) => {
		if (isDragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			});
		}
	};

	// Calculate averages and totals
	const calculateAverages = (data) => {
		const totalEntries = data.length;
		
		const sumLitters = data.reduce((acc, item) => acc + item.litter, 0);
		const sumAmount = data.reduce(
			(acc, item) => acc + item.calculatedAmount,
			0
		);
		const sumRate = data.reduce((acc, item) => acc + item.rate, 0);

		return {
			avgRatePerLitter: (sumRate / totalEntries).toFixed(2),
			sumLitters: sumLitters.toFixed(3),
			sumAmount,
			totalEntries,
		};
	};

	const {
		
		avgRatePerLitter,
		sumAmount,
		sumLitters,
		totalEntries,
	} = calculateAverages(reportData);

	const downloadPDF = () => {
		const doc = new jsPDF("p", "pt", "a4");

		// Add watermark
		doc.setFontSize(40);
		doc.setTextColor(150);
		//doc.text("Sri Vayusena Dairy Farm", 200, 400, { angle: 45 });

		doc.setFontSize(30);
		doc.setTextColor(100);
		//doc.text("Sri Vayusena Dairy Farm", 400, 400, { angle: 45 });

		doc.setTextColor(110);
		

		// Add brand name and milk shop name
		doc.setFontSize(18);
		doc.setFont("helvetica", "bold");
		doc.text("Sri Vayusena Dairy Farm", 300, 50, { align: "center", });
		doc.setFont('Italic','bold')
		doc.setFontSize(10);
		doc.text("Milk Collection Management with Sri Vayusena Dairy Farm", 300, 65, { align: "center",fontSize:12 });

		doc.setFontSize(16);
		// doc.text(`${reportData[0].adminId.shopName}`, 300, 90, { align: "center"});
		
		
		// Add cow and admin information
		doc.setFontSize(12);
		doc.setFont("helvetica", "normal");

		doc.text(`Farm Owner: ${reportData[0].adminId.name || "N/A"}`, 40, 120);
		doc.text(`Cattle Name: ${reportData[0].cowId.name || "N/A"}`, 40, 140);
		
		// doc.text(`Village: ${reportData[0].cowId.village || "N/A"}`, 40, 160);

		// Add start and end dates
		doc.text(
			`Report Period: ${dateValues.startDate} - ${dateValues.endDate}`,
			40,
			180
		);

		// Draw a horizontal line below the header
		doc.setLineWidth(0.5);
		doc.line(40, 190, 570, 190);

		// Generate table with stats
		autoTable(doc, {
			startY: 200,
			head: [
				[
					"Date",
					"Session",
					"Weight / Li",
				],
			],
			body: reportData.map((item) => [
				item.date,
				item.shift,
				item.litter,
			]),
		});

		// Add average stats below the table
		doc.text("Average Stats:", 40, doc.autoTable.previous.finalY + 30);
		autoTable(doc, {
			startY: doc.autoTable.previous.finalY + 50,
			head: [
				[
					
					"Total Weight / Li ",
				],
			],
			body: [
				[sumLitters],
			],
		});

		// Draw a horizontal line above the footer
		doc.setLineWidth(0.5);
		doc.line(
			40,
			doc.autoTable.previous.finalY + 50,
			570,
			doc.autoTable.previous.finalY + 50
		);

		// Footer with branding and signature
		doc.text("Milk Collection Management with Sri Vayusena Dairy Farm", 40, doc.autoTable.previous.finalY + 70);
		doc.text("Admin Signature:", 400, doc.autoTable.previous.finalY + 90);
		doc.text(
			`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
			40,
			doc.autoTable.previous.finalY + 90
		);

		// Add border around the entire PDF
		doc.setLineWidth(1);
		doc.rect(20, 20, 555, doc.autoTable.previous.finalY + 100);

		// View before downloading
		const pdfUrl = doc.output("dataurlnewwindow");

		// Download the PDF
		doc.save(`Milk_Report_${reportData[0].cowId.name || "Not Available"}_${new Date().toLocaleDateString()}.pdf`);
	};

	return (
		<>
			<Button size={"sm"} onClick={openReportModal}>
			Generate Report
			</Button>
			<Modal
				isOpen={isReportModalOpen}
				onClose={closeReportModal}
				size={"5xl"}
				isCentered
				
			>
				<ModalOverlay />
				<ModalContent
					maxW={useBreakpointValue({ base: "100vw", md: "80vw", sm: "70vh" })}
					maxH="80vh"
					overflowY="auto"
					position="absolute"
					top={`${position.y}px`}
					left={`${position.x}px`}
					onMouseDown={startDragging}
					
					transform={isMobile ? "translate(-50%, -50%)" : "translate(-50%, -50%)"}
					onMouseUp={stopDragging}
					onMouseMove={handleDragging}
					cursor={isDragging ? "grabbing" : "grab"}
					border={"1px solid teal"}
				>
					<ModalHeader
						cursor="grab"
						userSelect="none"
						
						color="white"
						p={4}
						borderRadius="md"
						boxShadow="md"
						borderBottom="1px solid #ddd"
						border={"1px solid teal"}
					>
						<Flex
							direction={"col"}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Heading fontSize={"lg"}>Milk Report Generator</Heading>
							<Button
								onClick={toggleLanguage}
								size={"sm"}
								alignSelf={"flex-end"}
								mt={2}
								ml={4}
								mb={0}
								mr={6}
								colorScheme={"orange"}
							>
								{language === "en" ? "Switch to Telugu" : "Switch to English"}
							</Button>
						</Flex>
					</ModalHeader>
					<ModalCloseButton mt={'4'} pl={'4'} />
					<ModalBody>
						<Box m={2}>
						<Heading as="h4" size="md" mb={2}>
								{language === "en" ? "Milk Totals" : " పాలు మొత్తాలు"}
							</Heading>
							<Table
								cursor={"pointer"}
								variant="striped"
								colorScheme="teal"
								size="sm"
								mb={4}
								borderWidth={2}
								borderColor={"gray.200"}
								borderRadius={"md"}
								maxW={useBreakpointValue({
									base: "100vw",
									md: "90vw",
									sm: "90vh",
								})}
							>
								<Thead color={"teal"} cursor={"pointer"} >
									<Tr>
										<Th>{translations[language].date}</Th>
										<Th>{translations[language].session}</Th>
										<Th>{translations[language].weight}</Th>
									</Tr>
								</Thead>
								<Tbody>
									{reportData.map((item, index) => (
										<Tr key={index}>
											<Td>{item.date || "N/A"}</Td>
											<Td>{language=="en"?item.shift:item.shift=='morning'?'ఉదయం':'సాయంత్రం' || "N/A"}</Td>
											<Td>{item.litter}</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</Box>
						<Box mt={4}>
							<Heading as="h4" size="md" mb={2}>
								{language === "en" ? "Averages & Totals" : "సగటులు & మొత్తాలు"}
							</Heading>
							<Table variant="striped"
							colorScheme="teal"
							size="sm"
							mb={4}
							borderWidth={2}
							borderColor={"gray.200"}
							borderRadius={"md"}
							maxW={useBreakpointValue({
								base: "100vw",
								md: "90vw",
								sm: "90vh",
							})}>
								<Tbody>
									<Tr>
										<Td>{translations[language].totalWeight}</Td>
										<Td>{sumLitters} </Td>
									</Tr>
									
								</Tbody>
							</Table>
						</Box>
					</ModalBody>
					<ModalFooter
            borderTop="1px solid #ddd"
            justifyContent={"space-between"}
            py={4}
          >
			<Flex gap={'2'}>

            <Button colorScheme="blue" onClick={downloadPDF}>
            <DownloadIcon />  Download PDF 
            </Button>
			<Spacer />
			<Button  onClick={closeReportModal}>
							Cancel
			</Button>
			</Flex>
            <Text>{`Bill Generation Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</Text>
          </ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProducedmilkReportModal;
