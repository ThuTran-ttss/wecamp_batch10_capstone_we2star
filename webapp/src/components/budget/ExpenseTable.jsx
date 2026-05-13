import { tripDetails } from "@mock_data/tripDetails";
import { MoreHorizontal, Filter, ChevronUp, ChevronDown } from "lucide-react";
import {useState} from "react";
import FilterMenu from "./FilterMenu";

export default function ExpenseTable ({
    expenses = [],
    setExpenses,
    onEdit,
    filters,
    setFilters,
    isOpenFilter,
    setIsOpenFilter,
    activeMenu,
    setActiveMenu,
    onSort,
    sortConfig}) 
    {
    
    const [openModalId, setOpenModalId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(expenses.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setExpenses(expenses.filter((ex) => ex.id !== id));
        setOpenModalId(null);
    };

    const categoryStyles = {
        Transport : "bg-blue-50 text-blue-600",
        Accommodation: "bg-purple-50 text-purple-600",
        Activity: "bg-green-50 text-green-600",
        Food: "bg-orange-50 text-orange-600",
        Shopping: "bg-pink-50 text-pink-600",
    };

    const renderSortIcon = (key) => {
        if (sortConfig?.key !== key) {
            return <ChevronDown size={14} className="ml-1 text-slate-300 opacity-50" />;
        }
        return sortConfig.direction === 'ascending' 
            ? <ChevronUp size={14} className="ml-1 text-blue-600 font-bold" /> 
            : <ChevronDown size={14} className="ml-1 text-blue-600 font-bold" />;
    };

    return (
        <div className="w-full mt-6">
            <div className="relative z-[100] mb-4"> 
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-slate-800">Recent Expenses</h2>
                        <div className="bg-slate-50 text-slate-500 text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-200">
                            {expenses.length} items found
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsOpenFilter(!isOpenFilter)}
                            className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium bg-white hover:bg-slate-50 border-slate-200 shadow-sm"
                        >
                            <Filter size={16} />
                            <span>Filter</span>
                        </button>

                        {isOpenFilter && (
                            <div className="absolute right-0 mt-2 z-[9999]">
                                <FilterMenu
                                    isOpen={isOpenFilter}
                                    activeMenu={activeMenu}
                                    setActiveMenu={setActiveMenu}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[28%]" />
                    <col className="w-[14%]" />
                    <col className="w-[14%]" />
                    <col className="w-[14%]" />
                    <col className="w-[14%]" />
                    <col className="w-[12%]" />
                    <col className="w-[8%]" />
                </colgroup>
                <thead>
                    <tr className="text-sm text-slate-500 uppercase text-[12px] bg-slate-50 border-y border-slate-200">
                        <th 
                            onClick={() => onSort("name")} 
                            className="cursor-pointer py-3 px-4 text-left"
                        > 
                             <div className="flex items-center gap-1">
                                Expense Item Name {renderSortIcon("name")}
                            </div>
                        </th >
                        <th 
                            onClick={() => onSort("category")} 
                            className="cursor-pointer py-3 px-4 text-left"
                        > 
                             <div className="flex items-center gap-1">
                                Category {renderSortIcon("category")}
                            </div>
                        </th >
                        <th 
                            onClick={() => onSort("estimatedCost")} 
                            className="cursor-pointer py-3 px-4 text-center"
                        > 
                             <div className="flex items-center gap-1 justify-end">
                                Estimated (VND) {renderSortIcon("estimatedCost")}
                            </div>
                        </th >
                        <th 
                            onClick={() => onSort("actualCost")} 
                            className="cursor-pointer py-3 px-4 text-center"
                        > 
                             <div className="flex items-center gap-1 justify-end">
                                Actual (VND) {renderSortIcon("actualCost")}
                            </div>
                        </th >
                        <th 
                            onClick={() => onSort("paymentStatus")} 
                            className="cursor-pointer py-3 px-4 text-center"
                        > 
                             <div className="flex items-center gap-1 justify-center">
                                Status {renderSortIcon("paymentStatus")}
                            </div>
                        </th >
                        <th onClick={() => onSort("diff")} 
                            className="cursor-pointer py-3 px-4 text-center"
                        > 
                            <div className="flex items-center gap-1 justify-center">
                                Diff. {renderSortIcon("diff")}
                            </div>
                        </th >
                        <th className= 'px-4 text-center'> </th>
                    </tr>
                </thead>
                
                <tbody>
                    {currentItems.map((expense) => {
                        const diff = expense.actualCost - expense.estimatedCost;

                        return (
                        <tr key= {expense.id} className="border-b">
                            <td className="text-[13px] font-bold py-4 px-4 text-left"> 
                                {expense.name}
                            </td>
                            <td className="text-[12px] py-4 px-4 text-left"> {expense.category}</td>
                            <td className="py-3 px-1 text-[12px] font-bold text-right text-slate-900 leading-none"> 
                                {expense.estimatedCost.toLocaleString("vi-VN")}
                            </td>
                            <td className="py-3 px-1 text-[12px] font-bold text-right text-slate-900 leading-none"> 
                                {expense.actualCost.toLocaleString("vi-VN")} VND 
                            </td>
                            <td className={`text-[12px] py-4 px-4 text-center font-bold underline ${expense.paymentStatus === "Unpaid" ? "text-red-500" : "text-green-600"}`}> 
                                {expense.paymentStatus} 
                            </td>
                            <td className={`text-[11px] py-4 px-4 text-center font-bold
                                        ${diff > 0 ? "text-red-500" : 
                                        diff < 0? "text-green-600"
                                        : "text-black"}`}
                            > 
                                {diff > 0 ? "+" : ""}
                                {(diff / 1000).toLocaleString("vi-VN")}k
                            </td>

                            <td className="px-4 text-center relative overflow-visible">
                                <button
                                    onClick={() => setOpenModalId(openModalId === expense.id ? null : expense.id)} 
                                    className="text-slate-400 hover:text-black p-2 transition-colors"
                                >
                                    <MoreHorizontal size={18}/>
                                </button>
                                
                                {openModalId === expense.id && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-[55]" 
                                            onClick={() => setOpenModalId(null)}
                                        ></div>

                                        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-28 bg-white border border-slate-200 shadow-xl rounded-lg z-[60] py-1 overflow-hidden animate-in fade-in zoom-in duration-100">
                                            <button 
                                                onClick={() => {
                                                    onEdit(expense);
                                                    setOpenModalId(null);
                                                }} 
                                                className="flex items-center w-full px-3 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            
                                            <div className="border-t border-slate-100 mx-1"></div>

                                            <button 
                                                onClick={() => {
                                                    handleDelete(expense.id);
                                                    setOpenModalId(null);
                                                }} 
                                                className="flex items-center w-full px-3 py-2 text-[12px] font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                        )
                        }
                    )}
                </tbody>
            </table>
            <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200">
                <div className="text-sm text-slate-400">
                    Showing <span className="text-slate-700 font-medium">{indexOfFirstItem + 1}</span> of <span className="text-slate-700 font-medium">{expenses.length}</span> entries
                </div>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors 
                                ${currentPage === i + 1 
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                                    : "bg-white border text-slate-600 hover:bg-slate-50"}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}