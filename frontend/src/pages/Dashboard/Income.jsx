import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";

import IncomeOverview from "../../components/Income/IncomeOverview";
import IncomeList from "../../components/Income/IncomeList";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
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


  // Fetch all income
    const fetchIncomeDetails = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const params = {
          page: currentPage,
          limit,
          sortBy,
        };

        if (searchQuery) params.search = searchQuery;
        if (fromDate) params.fromDate = fromDate;
        if (toDate) params.toDate = toDate;
        if (minAmount) params.minAmount = minAmount;
        if (maxAmount) params.maxAmount = maxAmount;

        const response = await axiosInstance.get(
          API_PATHS.INCOME.GET_ALL_INCOME,
          { params }
        );

        console.log("FULL RESPONSE:", response.data);

        if (response.data) {
          setIncomeData(response.data.incomes);     // ✅ FIX
          setTotalPages(response.data.totalPages || 1); // ✅ FIX
        }
      } catch (error) {
        console.error("Error fetching income details:", error);
        toast.error("Failed to load income details.");
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



  // Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount must be greater than 0.");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully ✅");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income.");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully 🗑️");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income.");
    }
  };

  // Download Income
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Income details downloaded 💾");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details.");
    }
  };

      useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery, fromDate, toDate, minAmount, maxAmount, sortBy]);

    useEffect(() => {
    const timer = setTimeout(() => {
      fetchIncomeDetails();
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
    <DashboardLayout activeMenu="Income">
      <div className="my-6 mx-auto max-w-7xl px-4">
        <motion.div
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Income Overview */}
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          {/* Search Input */}
          <div className="bg-white p-4 rounded-lg shadow-md space-y-4">

          {/* 🔹 Row 1 — 3 fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Source Search */}
            <input
              type="text"
              placeholder="Search income by source..."
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


          {/* Income List */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
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

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income record?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
