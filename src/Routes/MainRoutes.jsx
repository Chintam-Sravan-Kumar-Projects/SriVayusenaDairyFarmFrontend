import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
import { NotFound } from "../Pages/NotFound";
const UserRegistration = lazy(() => import("../Pages/User/UserRegistration"));
const CowRegistration = lazy(() => import("../Pages/cow/cowRegistration"));
const AdminRegistration = lazy(() =>
	import("../Pages/Admin/AdminRegistration")
);
const MilkInfo = lazy(() => import("../Components/MilkInfo"));
const UserDashboard = lazy(() =>
	import("../Pages/User/UserTable/UserDashboard")
);
const CowDashboard = lazy(() =>
	import("../Pages/cow/cowTable/cowDashboard")
);
const AdminLoginCard = lazy(() => import("../Pages/Admin/AdminLogin"));
const Layout = lazy(() => import("../Pages/Layout/Layout"));
const About = lazy(() => import("../Components/About/About"));
const Contact = lazy(() => import("../Components/Contact/Contact"));
const Home = lazy(() => import("../Components/Home/Home"));
const User = lazy(() => import("../Components/User/User"));
import Test from "../Test";
import { Loader1 } from "../Components/Loader1";
import { PrivateRoute } from "./PrivateRoute";
import Maintance from "../maintance/Maintance";
import MilkRateDashboard from "../Pages/Rate/MilkRateDashboard";
//import MilkDashboard from "../Pages/Milk/MilkTable/MilkDashboard";
const AddMilk = lazy(() => import("../Pages/Milk/AddMilk"));
const MilkDashboard = lazy(() =>
	import("../Pages/Milk/MilkTable/MilkDashboard")
);
const AddExpense = lazy(() => import("../Pages/expenses/AddExpense"));
const ExpenseDashboard = lazy(() =>
	import("../Pages/expenses/expensesTable/expensesDashboard")
);
const Addproducedmilk = lazy(() => import("../Pages/producedMilk/Addproducedmilk"));
const ProducedmilkDashboard = lazy(() =>
	import("../Pages/producedMilk/producedMilkTable/producedmilkDashboard")
);
const Addhealth = lazy(() => import("../Pages/health/Addhealth"));
const HealthDashboard = lazy(() =>
	import("../Pages/health/healthTable/healthDashboard")
);

export const MainRoutes = () => {
	return (
		<>
			<Routes>
				{/* Provide all routes here */}
				{/* // layout nested routing */}
				<Route
					path="/"
					element={
						<Suspense fallback={<Loader1 />}>
							<Layout />
						</Suspense>
					}
				>
					<Route
						path=""
						element={
							<Suspense fallback={<Loader1 />}>
								<Home />
							</Suspense>
						}
					/>
					<Route
						path="/about"
						element={
							<Suspense fallback={<Loader1 />}>
								<About />
							</Suspense>
						}
					/>
					<Route
						path="/contact"
						element={
							<Suspense fallback={<Loader1 />}>
								<Contact />
							</Suspense>
						}
					/>
					<Route
						path="user/:userid"
						element={
							<Suspense fallback={<Loader1 />}>
								<User />
							</Suspense>
						}
					/>
					<Route
						path="/admin/signup"
						element={
							<Suspense fallback={<Loader1 />}>
								<AdminRegistration />
								{/* <Maintance /> */}
							</Suspense>
						}
					/>
					<Route
						path="/admin/signin"
						element={
							<Suspense fallback={<Loader1 />}>
								<AdminLoginCard />
								{/* <Maintance /> */}
							</Suspense>
						}
					/>
				</Route>
				<Route path="test" element={<Test />} />
				//dashboard nested routes
				<Route
					path="/dashboard"
					element={
						<Suspense fallback={<Loader1 />}>
							<PrivateRoute>
								<Dashboard />
								{/* <Maintance /> */}
							</PrivateRoute>
						</Suspense>
					}
				>
					<Route
						path="add_milk"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<AddMilk />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="add_expense"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<AddExpense />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="add_producedmilk"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<Addproducedmilk />
								</PrivateRoute>
							</Suspense>
						}
					/>
					<Route
						path="add_report"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<Addhealth />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="add_user"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<UserRegistration />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="milk_info"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									
									<MilkDashboard />
								</PrivateRoute>
							</Suspense>
						}
					/>
					<Route
						path="report_info"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<HealthDashboard />
								</PrivateRoute>
							</Suspense>
						}
					/>
					<Route
						path="expense"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<ExpenseDashboard />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="producedmilk_info"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<ProducedmilkDashboard />
								</PrivateRoute>
							</Suspense>
						}
					/>

					<Route
						path="user_dashboard"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<UserDashboard />
								</PrivateRoute>
							</Suspense>
						}
					/>
					<Route
							path="rate"
							element={
								<Suspense fallback={<Loader1 />}>
									<PrivateRoute>
										<MilkRateDashboard />
									</PrivateRoute>
								</Suspense>
							}
						/>
					<Route
						path="cow_dashboard"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<CowDashboard/>
								</PrivateRoute>
							</Suspense>
						}
					/>
				<Route
						path="add_cow"
						element={
							<Suspense fallback={<Loader1 />}>
								<PrivateRoute>
									<CowRegistration />
								</PrivateRoute>
							</Suspense>
						}
					/>

				</Route>
				
				<Route
					path="*"
					element={
						<Suspense fallback={<Loader1 />}>
							<Layout />
							<Home />
						</Suspense>
					}
				/>
				
				<Route path="/test" element={<Loader1 />} />
			</Routes>
		</>
	);
};
