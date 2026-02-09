import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const limit = 5; // items per page

  // Fetch all expenses
    const fetchExpenseDetails = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.GET_ALL_EXPENSE,
          {
            params: {
              search: searchQuery,
              page: currentPage,
              limit,
              fromDate,
              toDate,
              minAmount,
              maxAmount,
              sortBy,
            },
          }
        );

        console.log("FULL RESPONSE:", response.data);

        if (response.data) {
          setExpenseData(response.data.expenses);     // ✅ FIX
          setTotalPages(response.data.totalPages || 1); // ✅ FIX
        }
      } catch (error) {
        console.error("Error fetching expense details:", error);
        toast.error("Failed to load expense details.");
      } finally {
        setLoading(false);
      }
    };


    const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset page on search
    };

    const handlePageChange = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    };

  // Add Expense
  const handleAddExpense = async (expense) => {
    const { source, amount, date, icon } = expense;

    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully ✅");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense.");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully 🗑️");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  // Download Expense
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Expense details downloaded 💾");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExpenseDetails();
    }, 400); // debounce delay

    return () => clearTimeout(timer); // ✅ IMPORTANT
  }, [
    searchQuery,
    fromDate,
    toDate,
    minAmount,
    maxAmount,
    sortBy,
    currentPage,
  ]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-6 mx-auto max-w-7xl px-4">
        <motion.div
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Expense Overview */}
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          {/* Search Input */}
          <div className="bg-white p-4 rounded-lg shadow-md space-y-4">

          {/* 🔹 Row 1 — 3 fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Source Search */}
            <input
              type="text"
              placeholder="Search expense by source..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 border rounded-md focus:ring-2 focus:ring-teal-500"
            />

            {/* From Date */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border rounded-md"
            />

            {/* To Date */}
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border rounded-md"
            />

          </div>

          {/* 🔹 Row 2 — 2 fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Amount Range */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Min Amount"
                className="p-2 border rounded-md"
              />

              <input
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Max Amount"
                className="p-2 border rounded-md"
              />
            </div>

            {/* Sorting */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>

          </div>
        </div>


          {/* Expense List */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-teal-500 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-teal-700 text-white"
                      : "bg-teal-500 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-teal-500 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </motion.div>

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense record?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
