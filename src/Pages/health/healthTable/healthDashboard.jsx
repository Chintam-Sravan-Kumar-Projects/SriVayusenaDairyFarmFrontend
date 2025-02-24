"use client";

import React, { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	User,
	Pagination,
	Progress,
} from "@nextui-org/react";
import { PlusIcon } from "../../User/UserTable/PlusIcon";
import { VerticalDotsIcon } from "../../User/UserTable/VerticalDotsIcon";
import { SearchIcon } from "../../User/UserTable/SearchIcon";
import { ChevronDownIcon } from "../../User/UserTable//ChevronDownIcon";
import { columns, statusOptions } from "./data.js";
import { capitalize } from "../../User/UserTable/utils";
import { useDispatch, useSelector } from "react-redux";

import { Select, SelectItem } from "@nextui-org/react";
import { color } from "framer-motion";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { Loader } from "../../../Components/Loader";
import {
	deleteExistinghealthEntry,
	gethealthDetails,
} from "../../../Redux/Slices/healthSlice";
import { toast } from "react-toastify";
//import MoreInfoModal from "../../../Components/models/MoreInfoModel";
import { DeleteConfirmationModal } from "../../../Components/models/DeleteModel";
import HealthReportModal from "./ReportGenerator";
import { getcowsDetails } from "../../../Redux/Slices/cowSlice";

const statusColorMap = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
	"title",
	"date",
	"duedate",
	"actions",
];

function HealthDashboard() {
	
	const dispatch = useDispatch();
	// store data
	
	const { token, user } = useSelector((state) => state.auth);
	
	useEffect(() => {
		dispatch(getcowsDetails(token));
	  }, [dispatch, token]);

	  const { cowData } = useSelector((state) => state.cow);
	const { data, loading, error } = useSelector((state) => state.health);

	const users = data == null ? [] : data;


	const [filterValue, setFilterValue] = React.useState("");
	const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(20);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "age",
		direction: "ascending",
	});
	const [dateValues, setDateValues] = useState({
		startDate: "",
		endDate: "",
	});
	const [dateMode, setDateMode] = useState("date"); // "date" or "duedate"

	const [minDate, setMinDate] = useState(""); // Set initial min date
	const [maxDate, setMaxDate] = useState(""); // Set initial max date
	const [page, setPage] = React.useState(1);
	const [healthStats, sethealthStats] = React.useState([
		{
			fat: 0,
			snf: 0,
			degree: 0,
			water: 0,
			totalLitters: 0,
			totalEntries: 0,
		},
	]);
	const [statUserName, setStatUserName] = React.useState("data not available");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [viewDetails, setViewDetails] = React.useState(null);

	const [selectedDeleteItem, setSelectedDeleteItem] = React.useState(null);

	const hasSearchFilter = Boolean(filterValue);

	const handleView = (item) => {
		setViewDetails(item);
		openModal();
	};
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};


	

	// delete health entry
	
	const handleDeleteEntry = (item) => {
		
		const id = item._id;
		dispatch(deleteExistinghealthEntry({ id, token }));
	};
	const openDeleteModal = (item) => {
		setDeleteModalOpen(true);
		setSelectedDeleteItem(item);
		
	};

	const handleSelectcow = (e) => {
		const payload = e.target.value;

		dispatch(gethealthDetails({ value: payload, token }));
		dispatch(getcowsDetails(token));
		findName(e.target.value, filteredItems);
	};

	const findName = (value, filteredItems) => {
		let x = cowData.forEach((user) => {
			if (user._id == value) {
				setStatUserName(user.name);
			}
		});
	};

	const handleDateChange = (event, dateType) => {
		event.stopPropagation();

		const { value } = event.target;

		// Ensurem that the date is in the correct format (YYYY-MM-DD)
		const formattedDate = new Date(value).toISOString().split("T")[0];

		setDateValues((prevValues) => ({
			...prevValues,
			[dateType]: formattedDate,
		}));
	};

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...users];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) =>
				user.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusOptions.length
		) {
			filteredUsers = filteredUsers.filter((user) =>
				Array.from(statusFilter).includes(user.status)
			);
		}

		return filteredUsers;
	}, [users, filterValue, statusFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const parseCustomDate = (dateString) => {
		if (!dateString) return null;
		
		// Example input: "21/02/2025, 12:09:00 am"
		const [datePart, timePartWithMeridiem] = dateString.split(", ");
		if (!datePart || !timePartWithMeridiem) return null;
	  
		const [day, month, year] = datePart.split("/");
		
		// Split the time part to extract time and meridiem
		const [timePart, meridiem] = timePartWithMeridiem.toLowerCase().split(" ");
		let [hours, minutes, seconds] = timePart.split(":");
		
		hours = parseInt(hours, 10);
		if (meridiem === "pm" && hours < 12) {
		  hours += 12;
		}
		if (meridiem === "am" && hours === 12) {
		  hours = 0;
		}
		
		// Format hours, minutes, seconds to two digits
		const hh = String(hours).padStart(2, "0");
		const mm = minutes.padStart(2, "0");
		const ss = seconds.padStart(2, "0");
		
		// Build an ISO-like date string (e.g., "2025-02-21T00:09:00")
		const isoString = `${year}-${month}-${day}T${hh}:${mm}:${ss}`;
		return new Date(isoString);
	  };

	  
	  const sortedItems = React.useMemo(() => {
		return [...items]
		  .sort((a, b) => {
			const first = a[sortDescriptor.column];
			const second = b[sortDescriptor.column];
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		  })
		  .filter((item) => {
			
			// Choose the correct date field based on dateMode
			const itemDate = dateMode === "duedate" ? item.duedate : item.date;
			
			// Use the custom parser to get a Date object
			let start = parseInt(dateValues.startDate.split('-').join(''));
				let end = parseInt(dateValues.endDate.split('-').join(''));
				let createddate = parseInt(itemDate.slice(0, 10).split('/').reverse().join(''));

				if (dateValues.startDate !== "" && dateValues.endDate !== "") {
					if (createddate >= start && createddate <= end) {
						return true
					}
				} else {
					return true
				}
		  });
	  }, [sortDescriptor, items, dateValues, dateMode]);
	  
	  

	const datePiker = React.useMemo(() => {
		const currentDate = new Date();
		//setup min and max date
		// Subtract 15 days
		const twentyDaysAgo = new Date(currentDate);
		twentyDaysAgo.setDate(currentDate.getDate() - 20);
		setMinDate(new Date(twentyDaysAgo).toISOString().split("T")[0]);
		setMaxDate(new Date(currentDate).toISOString().split("T")[0]);
	}, []);

	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey];
		switch (columnKey) {
			case "name":
				return (
					<User
						avatarProps={{ radius: "lg", src: user.avatar }}
						description={user.email}
						name={cellValue}
					>
						{user.email}
					</User>
				);
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-small capitalize">{cellValue}</p>
						<p className="text-bold text-tiny capitalize text-default-400">
							{user.team}
						</p>
					</div>
				);
			case "status":
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[user.status]}
						size="sm"
						variant="flat"
					>
						{cellValue}
					</Chip>
				);
			case "actions":
				return (
					<div className="relative flex justify-end items-center gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="light">
									<VerticalDotsIcon className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem onClick={() => openDeleteModal(user)}>
									Delete
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e) => {
		consoe.log("row per page", e);
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);
  const topContent = React.useMemo(() => {
	if (!cowData || cowData.length === 0) {
	  return (
		<div className="p-4">
		  <Progress size="sm" isIndeterminate aria-label="Loading cow data..." />
		</div>
	  );
	}
  
	return (
	  <>
		<div className="flex={['column', 'column', 'row']} gap-4 ">
		  <div className="flex justify-between gap-4 items-end flex={['row', 'column', 'column']}">
			{/* Left side: Date filter */}
			<div className="mb-2">
			  <label htmlFor="dateMode">Filter by:</label>
			  <select
				id="dateMode"
				value={dateMode}
				onChange={(e) => setDateMode(e.target.value)}
				className="ml-2"
			  >
				<option value="date">Date</option>
				<option value="duedate">Due Date</option>
			  </select>
			</div>
  
			<div className="flex justify-between gap-2 items-end">
			  <Input
				size="sm"
				name="startDate"
				
				type="date"
				value={dateValues.startDate}
				onChange={(e) => handleDateChange(e, "startDate")}
				className="max-w-22"
				label="Select start date"
				placeholder="Select start Date"
				labelPlacement="outside"
			  />
  
			  <Input
				size="sm"
				name="endDate"
				
				type="date"
				value={dateValues.endDate}
				onChange={(e) => handleDateChange(e, "endDate")}
				className="max-w-22"
				label="Select end date"
				placeholder="Select end Date"
				labelPlacement="outside"
			  />
			</div>
  
			{/* Right side buttons */}
			<div className="flex sm:flex-row gap-3 md:flex-row">
			  <div>
				<HealthReportModal
				  reportData={sortedItems}
				  dateValues={dateValues}
				  dateMode={dateMode}
				/>
			  </div>
			  <div>
				<Dropdown>
				  <DropdownTrigger className="hidden sm:flex">
					<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
					  Columns
					</Button>
				  </DropdownTrigger>
				  <DropdownMenu
					disallowEmptySelection
					aria-label="Table Columns"
					closeOnSelect={false}
					selectedKeys={visibleColumns}
					selectionMode="multiple"
					onSelectionChange={setVisibleColumns}
					emptyContent="data not available"
				  >
					{columns.map((column) => (
					  <DropdownItem key={column.uid} className="capitalize">
						{capitalize(column.name)}
					  </DropdownItem>
					))}
				  </DropdownMenu>
				</Dropdown>
			  </div>
			</div>
		  </div>
  
		  {/* New row */}
		  <div className="flex justify-between gap-1.5 items-center mt-2 p-2">
			<span className="text-default-400 text-small">Total {sortedItems.length} Entries</span>
			{cowData.length === 0 ? (
			  <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />
			) : (
			  <Select
				size={"sm"}
				label="Select a cow"
				className="max-w-xs"
				name="cowId"
				onChange={(e) => handleSelectcow(e)}
			  >
				{cowData.map((user) => (
				  <SelectItem key={user._id} value={user._id}>
					{user.name}
				  </SelectItem>
				))}
			  </Select>
			)}
  
			<label className="flex items-center text-default-400 text-small">
			  {/* Optional: Rows per page */}
			</label>
		  </div>
		</div>
	  </>
	);
  }, [
	filterValue,
	statusFilter,
	visibleColumns,
	onRowsPerPageChange,
	users ? users.length : 0,
	onSearchChange,
	hasSearchFilter,
	dateValues,
	// Include cowData if needed
	cowData,
	dateMode,
  ]);
  
  
	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={() => setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onClick={onPreviousPage}
					>
						Previous
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onClick={onNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		);
	}, [selectedKeys, items.length, page, pages, hasSearchFilter]);

	

	return (
		<>
			
			{
				<DeleteConfirmationModal
					isOpen={isDeleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onDelete={handleDeleteEntry}
					item={selectedDeleteItem}
				/>
			}

			{cowData.length ? (
				<Table
					aria-label=" table with custom cells, pagination and sorting"
					isHeaderSticky
					bottomContent={bottomContent}
					bottomContentPlacement="outside"
					classNames={{
						wrapper: "max-h-[382px]",
					}}
					selectedKeys={selectedKeys}
					selectionMode="multiple"
					sortDescriptor={sortDescriptor}
					topContent={topContent}
					topContentPlacement="outside"
					onSelectionChange={setSelectedKeys}
					onSortChange={setSortDescriptor}
				>
					<TableHeader columns={headerColumns}>
						{(column) => (
							<TableColumn
								key={column.uid}
								align={column.uid === "actions" ? "center" : "start"}
								allowsSorting={column.sortable}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>

					<TableBody
						emptyContent={
							loading
								? "...Loading"
								: data && data.length == 0
								? "Entry not found"
								: "data not available"
						}
						items={sortedItems}
					>
						{(item) => (
							<TableRow key={item._id}>
								{(columnKey) => (
									<TableCell>{renderCell(item, columnKey)}</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			) : (
				<div style={{ display: "flex", flexDirection: "columns" }}>
					<Heading color={"tomato"} m={"auto"}>
						{cowData.err}{" "}
						<p style={{ fontSize: "20px", color: "blue" }}>
							Please try again..!
						</p>
					</Heading>
				</div>
			)}

			
		</>
	);
}

export default HealthDashboard;
