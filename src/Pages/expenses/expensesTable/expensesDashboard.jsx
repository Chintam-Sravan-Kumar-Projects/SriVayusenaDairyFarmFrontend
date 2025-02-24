import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Progress } from "@nextui-org/react";
import { VerticalDotsIcon } from "../../User/UserTable/VerticalDotsIcon";
import { ChevronDownIcon } from "../../User/UserTable//ChevronDownIcon";
import { columns, statusOptions } from "./data.js";
import { capitalize } from "../../User/UserTable/utils";
import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem } from "@nextui-org/react";
import { Heading} from "@chakra-ui/react";
import {deleteExistingexpenseEntry,getexpenseDetails} from "../../../Redux/Slices/expensesSlice";
import MoreInfoModal from "../../../Components/models/MoreInfoModel3";
import { DeleteConfirmationModal } from "../../../Components/models/DeleteModel";
import ExpenseReportModal from "./ReportGenerator";

const statusColorMap = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
	"date",
	"expense",
	"actions",
	"calculatedAmount",
];

function ExpenseDashboard() {
	// store data
	const { data, loading, error } = useSelector((state) => state.expense);
	const { token, user } = useSelector((state) => state.auth);
	const { expenseData } = useSelector((state) => state.expense);

	const dispatch = useDispatch();
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
	const [page, setPage] = React.useState(1);
	const [expenseStats, setexpenseStats] = React.useState([
		{
			fat: 0,
			snf: 0,
			degree: 0,
			water: 0,
			totalLitters: 0,
			totalEntries: 0,
		},
	]);
	
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

	// delete milk entry
	
	const handleDeleteEntry = (item) => {
		
		const id = item._id;
		dispatch(deleteExistingexpenseEntry({ id, token }));
	};
	const openDeleteModal = (item) => {
		setDeleteModalOpen(true);
		setSelectedDeleteItem(item);
		
	};

	useEffect(() => {
    dispatch(getexpenseDetails({ token }));
  }, [dispatch, token]);
	
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
		return (filteredItems || []).slice(start, end);

	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items]
			.sort((a, b) => {
				const first = a[sortDescriptor.column];
				const second = b[sortDescriptor.column];
				const cmp = first < second ? -1 : first > second ? 1 : 0;

				return sortDescriptor.direction === "descending" ? -cmp : cmp;
			})
			.filter((item) => {
				const createdDateObj = item.date

				let start = parseInt(dateValues.startDate.split('-').join(''));
				let end = parseInt(dateValues.endDate.split('-').join(''));
				let createddate = createdDateObj
					? parseInt(
						createdDateObj
							.slice(0, 10)
							.split('/')
							.reverse()
							.join('')
						)
					: 0;


				if (dateValues.startDate !== "" && dateValues.endDate !== "") {
					if (createddate >= start && createddate <= end) {
						return item
					}
				} else {
					return item
				}
			});
	}, [sortDescriptor, items, dateValues]);

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
								<DropdownItem onClick={() => handleView(user)}>
									View
								</DropdownItem>
								<DropdownItem onClick={() => handleView(user)}>
									Edit
								</DropdownItem>
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


  const getexpenseStats = React.useMemo(() => {
		let stats = [...sortedItems];
		let [totalFat, totalSnf, totalWater, totalDegree, totalLitters] = [
			0, 0, 0, 0, 0,
		];
     const totalEntries = stats.length;
    const sumAmount =stats.reduce ((acc,item)=> acc+item.calculatedAmount,0)
    if(stats ==[])
      return [{ sumAmount }];
    return [{
      
      sumAmount,
      totalEntries,
    }];
		
	}, [dateValues, sortedItems]);

	const topContent = React.useMemo(() => {
		return (
			<>
				<div className="flex={['column', 'column', 'row']} gap-4 ">
					<div className="flex justify-between gap-4 items-end  flex={['row', 'column', 'column']}">

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

              {/* //right side button */}
            
              <div className=" flex sm:flex-row gap-3 md:flex-row" >
              <div>
                  
                  <ExpenseReportModal reportData={sortedItems} dateValues={dateValues} />
              </div>
              <div>
                  <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                      <Button
                        endContent={<ChevronDownIcon className="text-small" />}
                        variant="flat"
                      >
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


           {/* new row */}
					<div className="flex justify-between gap-1.5 items-center mt-2  p-2">
						<span className="text-default-400 text-small">
							Total {sortedItems.length} Entries
						</span>

						<label className="flex items-center text-default-400 text-small">
							
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
				<MoreInfoModal
					isOpen={isModalOpen}
					onClose={closeModal}
					details={viewDetails}
				/>
			}
			{
				<DeleteConfirmationModal
					isOpen={isDeleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onDelete={handleDeleteEntry}
					item={selectedDeleteItem}
				/>
			}

			{expenseData.length ? (
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

					<TableBody items={sortedItems} getKey={(item) => item._id}>
						{(item, index) => (
							<TableRow key={item._id || index}>
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
						{expenseData.err}{" "}
						<p style={{ fontSize: "20px", color: "blue" }}>
							Please try again..!
						</p>
					</Heading>
				</div>
			)}

			{/* //Arithmatic table  */}
			<div>
				{expenseData.length ? (
					<Table aria-label=" static collection table">
						<TableHeader>
							<TableColumn>Total Entries</TableColumn>
							<TableColumn>Total Amount / ₹</TableColumn>
						</TableHeader>
						<TableBody
								emptyContent={loading || expenseStats == [] ? "...Loading" : "No Entry Found"}
								items={getexpenseStats}
								getKey={(item) => String(item.totalEntries)}
								>
								{(item) => (
									<TableRow key={item.totalEntries}>
									<TableCell>{item.totalEntries || 0}</TableCell>
									<TableCell>₹ {item.sumAmount || 0}</TableCell>
									</TableRow>
								)}
								</TableBody>


					</Table>
				) : (
					""
				)}
			</div>
		</>
	);
}

export default ExpenseDashboard;
