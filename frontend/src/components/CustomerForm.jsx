/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { useEffect } from "react";
import useCustomerStore from "../stores/useCustomerStore";
import toast from "react-hot-toast";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const CustomerForm = ({ dataCustomer, setDataCustomer }) => {
  const {
    error,
    createCustomer,
    updateCustomerById,
    message,
    mode,
    status,
    isModalOpen,
  } = useCustomerStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      useCustomerStore.setState({ error: null });
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      useCustomerStore.setState({ message: null });
    }
  }, [message]);
  const handleForm = async (e) => {
    console.log("test");
    e.preventDefault();
    const customer = {
      name: dataCustomer.name,
      email: dataCustomer.email,
      phoneNumber: dataCustomer.phoneNumber,
    };
    if (
      dataCustomer.name === "" ||
      dataCustomer.email === "" ||
      dataCustomer.phoneNumber === ""
    ) {
      toast.error("Please fill all  the fields");
      return;
    }
    console.log(mode);
    if (mode === "create") {
      await createCustomer(customer);
    } else if (mode === "edit") {
      await updateCustomerById(dataCustomer.id, customer);
      console.log(customer);
    }

    if (status === "success") {
      useCustomerStore.setState({ status: null });
    }
    useCustomerStore.setState({ isModalOpen: false });
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" w-[500px] flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              {mode === "create" ? "create" : "update"} Customers
            </h3>
            <button
              onClick={() => useCustomerStore.setState({ isModalOpen: false })}
              className="text-4xl"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleForm}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="name">Name :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  value={dataCustomer.name}
                  onChange={(e) =>
                    setDataCustomer({ ...dataCustomer, name: e.target.value })
                  }
                  className="w-full p-1 border-2 border-black rounded-md"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="email">Email: </label>
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  value={dataCustomer.email}
                  onChange={(e) =>
                    setDataCustomer({ ...dataCustomer, email: e.target.value })
                  }
                  className="w-full p-1 border-2 border-black rounded-md"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="name">Phone Number</label>
              </div>
              <div>
                <input
                  type="text"
                  value={dataCustomer.phoneNumber}
                  onChange={(e) =>
                    setDataCustomer({
                      ...dataCustomer,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full p-1 border-2 border-black rounded-md"
                />
              </div>
            </div>

            <button
              className="bg-sky-500 mt-3 w-full py-1 text-lg rounded-md text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerForm;
