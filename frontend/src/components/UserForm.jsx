/* eslint-disable react/prop-types */
import Modal from "react-modal";
import useUserStore from "../stores/useUserStore";
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

const UserForm = ({ dataUser, setDataUser }) => {
  const { mode, createUser, status, isModalOpen, updateUserById } =
    useUserStore();
  const handleFormUser = async (e) => {
    e.preventDefault();
    try {
      if (dataUser.username === "" || dataUser.email === "") {
        toast.error("Please fill all  the fields");
        return;
      }
      const users = {
        username: dataUser.username,
        email: dataUser.email,
        roleName: dataUser.roleName,
      };
      console.log(users);
      if (mode === "create") {
        await createUser(users);
      } else if (mode === "edit") {
        await updateUserById(dataUser.id, users);
      }
      if (status === "success") {
        useUserStore.setState({ status: null });
      }
      useUserStore.setState({ isModalOpen: false });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
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
              {mode === "create" ? "Create" : "Update"} Users
            </h3>
            <button
              onClick={() => useUserStore.setState({ isModalOpen: false })}
              className="text-4xl"
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleFormUser}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="name">Username :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  value={dataUser.username}
                  onChange={(e) => {
                    setDataUser({ ...dataUser, username: e.target.value });
                  }}
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
                  type="text"
                  id="email"
                  value={dataUser.email}
                  onChange={(e) => {
                    setDataUser({ ...dataUser, email: e.target.value });
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                />
              </div>
            </div>
            <select
              id="role"
              value={dataUser.roleName}
              onChange={(e) =>
                setDataUser({ ...dataUser, roleName: e.target.value })
              }
              className="w-full p-1 border-2 border-black rounded-md"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
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

export default UserForm;
