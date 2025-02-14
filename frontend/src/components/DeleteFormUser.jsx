/* eslint-disable react/prop-types */
import Modal from "react-modal";
import useUserStore from "../stores/useUserStore";
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
const DeleteFormUser = ({ dataUser }) => {
  const { deleteUserById, users, isModalDeleteOpen } = useUserStore();

  return (
    <div>
      <Modal
        isOpen={isModalDeleteOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" w-[500px] flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              Delete
            </h3>
            <button
              onClick={() =>
                useUserStore.setState({ isModalDeleteOpen: false })
              }
              className="text-4xl"
            >
              &times;
            </button>
          </div>
          <h1 className="text-center font-bold text-2xl">
            Are u sure Delete this Data?
          </h1>
          <div className="flex justify-center items-center gap-5 my-10">
            <button
              className="bg-red-500 p-2 font-black text-md"
              onClick={() =>
                useUserStore.setState({ isModalDeleteOpen: false })
              }
            >
              No
            </button>
            <button
              className="bg-green-500 p-2 font-black text-md"
              onClick={() => {
                deleteUserById(dataUser.id, users);
                console.log(dataUser.id);
                useUserStore.setState({ isModalDeleteOpen: false });
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteFormUser;
