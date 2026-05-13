import {useState} from "react";
import ExpenseTable from "@components/budget/ExpenseTable";
import ExpenseModel from "@components/budget/ExpenseModal";
import BudgetSummary from "@components/budget/BudgetSummary";
import CostByCategory from "@components/budget/CostPerCategory";
import BudgetOverviewCard from "@components/budget/BudgetOverviewCard";
import BudgetAlert from "@components/budget/BudgetAlert";
import { tripDetails } from "@mock_data/tripDetails";
import { Wallet, CreditCard, Coins, Target } from "lucide-react";

export default function BudgetPage () {

    const [initialBudget, setInitialBudget] = useState();
    const [expenses, setExpenses] = useState(tripDetails.trip_001.budgetItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [filters, setFilters] = useState({
        category : "",
        paymentStatus: "",
    });
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const [sortConfig, setSortConfig] = useState([]);

    const totalActual = expenses.reduce((sum, item) => sum + (Number(item.actualCost) || 0), 0);

    const handleEditExpense = (expense) => {
        setSelectedExpense(expense);
        setIsModalOpen(true);
    };
    
    const filteredExpenses = (expenses || []).filter((ex) => {
        if (!ex) return false;
        const matchCategory = !filters.category || ex.category === filters.category;
        const matchStatus = !filters.paymentStatus || ex.paymentStatus === filters.paymentStatus;

        return matchCategory && matchStatus;
    })

    const sortedExpenses = Array.isArray(filteredExpenses)? [...filteredExpenses].sort((a, b) => {
        
        if (!sortConfig || sortConfig.length === 0) return 0;

        for (const { key, direction } of sortConfig) {
            let aValue, bValue;

            if (key === "diff") {
                aValue = (a.actualCost || 0) - (a.estimatedCost || 0);
                bValue = (b.actualCost || 0) - (b.estimatedCost || 0);
            } else {
                aValue = a[key] ?? "";
                bValue = b[key] ?? "";
            }

            if (aValue === bValue) continue;

            const modifier = direction === "asc" ? 1 : -1;

            if (typeof aValue === "string") {
                return aValue.localeCompare(bValue) * modifier;
            } else {
                return (aValue - bValue) * modifier;
            }
        }
        return 0;
    }) : [];

    const handleSort = (key) => {
        setSortConfig((prev) => {
            const existingIndex = prev.findIndex((s) => s.key === key);
            let newConfig = [...prev];

            if (existingIndex > -1) {
                
                if (newConfig[existingIndex].direction === "asc") {
                    newConfig[existingIndex] = { key, direction: "desc" };
                } else {
                    newConfig.splice(existingIndex, 1);
                }
            } else {
                newConfig.push({ key, direction: "asc" });
            }
            
            return newConfig;
        });
    };
    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
        {/* SIDEBAR TRÁI */}
        <aside className="w-64 border-r bg-white p-6 hidden lg:block sticky top-0 h-screen">
            <div className="text-blue-600 font-bold text-xl mb-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white italic">F</div>
            ItineraryFlow
            </div>
        </aside>

        <main className="flex-1 p-10">
            {/* HEADER SECTION */}
            <header className="flex justify-between items-end mb-8">
            <div>
                <div className="text-sm text-slate-400 mb-1">My Journeys  &gt;  <span className="text-slate-900 font-medium">Nha Trang Discovery</span></div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                Nha Trang Family Trip <Target size={20} className="text-slate-300 cursor-pointer" />
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">Jun 10 - Jun 15, 2026 • 5 Days trip</p>
            </div>
            <div className="flex gap-3">
                <button 
                onClick={() => { setSelectedExpense(null); setIsModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all"
                >
                + Add Expense
                </button>
            </div>
            </header>

            <div className="grid grid-cols-12 gap-8 items-start">
            
            
            <div className="col-span-12 lg:col-span-9 space-y-8">
                
                <BudgetSummary 
                    expenses={expenses}
                    totalActual={totalActual}
                    initialBudget={initialBudget}
                    setInitialBudget={setInitialBudget}
                />

                <BudgetAlert 
                    totalActual={totalActual}
                    initialBudget={initialBudget} 
                    onReview={() => console.log("Reviewing...")} 
                />

                <ExpenseTable 
                    expenses={sortedExpenses}
                    setExpenses={setExpenses}
                    onEdit={handleEditExpense}
                    filters={filters}
                    setFilters={setFilters}
                    isOpenFilter={isOpenFilter}
                    setIsOpenFilter={setIsOpenFilter}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
            </div>

            
            <div className="col-span-12 lg:col-span-3 space-y-6">
                <BudgetOverviewCard 
                    expenses={expenses} 
                    initialBudget={initialBudget}
                    totalActual={totalActual}
                />
                <CostByCategory
                    expenses = {expenses}
                    totalActual={totalActual}
                    initialBudget = {initialBudget}
                />
            </div>

            </div>
        </main>
            {
                isModalOpen && (
                    <ExpenseModel 
                        expenses = {expenses}
                        setExpenses = {setExpenses}
                        selectedExpense = {selectedExpense}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedExpense(null);
                        }}
                    />
                )
            }
        </div>
    )
}