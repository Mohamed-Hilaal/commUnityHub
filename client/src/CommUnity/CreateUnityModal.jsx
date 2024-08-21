import CreateCommunityForm from "./CreateCommUnityForm";
import StepperCreateCommunityForm from './StepperCreateCommunityForm';
const CreateUnityModal = ({closeModal}) => {

    const handleSubmit = (formData) => {
      // Handle form submission here
      console.log(formData);
      closeModal();
    };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 backdrop-blur-sm">
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create New Community
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          <StepperCreateCommunityForm onSubmit={handleSubmit} onCancel={closeModal} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default CreateUnityModal;
