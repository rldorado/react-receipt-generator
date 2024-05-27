interface FormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  title: string;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onRequestClose, children, title }) => {
  return (
    <dialog id="form_modal" className={`modal ${isOpen ? 'modal-open' : ''} modal-bottom sm:modal-middle`}>
      <div className="modal-box relative p-0 rounded-lg shadow-lg">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="btn btn-sm btn-circle btn-ghost text-white" onClick={onRequestClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
};

export default FormModal;
