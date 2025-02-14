/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";
const UserPage = ({ setDataUser }) => {
  const {
    getAllUser,
    users,
    isLoading,
    error,
    message,
    isModalDeleteOpen,
    isModalOpen,
  } = useUserStore();
  useEffect(() => {
    getAllUser();
  }, [getAllUser]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      useUserStore.setState({ error: null });
    }
  }, [error]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      useUserStore.setState({ message: null });
    }
  }, [message]);
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
      name: "Username",
      selector: (row) => row.username,
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
      name: "Role",
      selector: (row) => row.roles[0].roleName,
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
              setDataUser(row);
              useUserStore.setState({ mode: "edit", isModalOpen: true });
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 w-20 h-5 text-white font-bold rounded"
            onClick={() => {
              setDataUser(row);
              useUserStore.setState({ isModalDeleteOpen: true });
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
              setDataUser({
                username: "",
                email: "",
              });
              useUserStore.setState({ isModalOpen: true });
            }}
          >
            + Create User
          </button>
        </div>
        <DataTable
          columns={columns}
          data={users}
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

export default UserPage;
