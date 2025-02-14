/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";
import useCustomerStore from "../stores/useCustomerStore";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

const CustomerPage = ({ setCustomers, setDataCustomer }) => {
  const {
    getAllCustomer,
    customers,
    isLoading,
    mode,
    isModalDeleteOpen,
    isModalOpen,
  } = useCustomerStore();

  useEffect(() => {
    getAllCustomer();
  }, [getAllCustomer]);
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      style: {
        minWidth: "50px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      style: {
        minWidth: "150px",
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2 items-center">
          <button
            className="bg-yellow-500 w-20 h-5 hover:bg-yellow-700 text-white font-bold rounded"
            onClick={() => {
              setDataCustomer(row);
              useCustomerStore.setState({ mode: "edit", isModalOpen: true });
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 w-20 h-5 text-white font-bold rounded"
            onClick={() => {
              setDataCustomer(row);
              useCustomerStore.setState({ isModalDeleteOpen: true });
            }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      style: {
        minWidth: "200px",
      },
    },
  ];
  if (isLoading) return <Loading />;
  return (
    <motion.div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <div className="flex justify-between my-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setDataCustomer({
                name: "",
                email: "",
                phoneNumber: "",
              });
              useCustomerStore.setState({ mode: "create", isModalOpen: true });
            }}
          >
            + Create Customers
          </button>
        </div>
        <DataTable
          columns={columns}
          data={customers}
          className="table"
          pagination
          striped
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </motion.div>
  );
};

export default CustomerPage;
