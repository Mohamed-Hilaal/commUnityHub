import React, { useState } from 'react';
import { FaUser, FaListAlt, FaFileAlt, FaEnvelope, FaBullseye } from 'react-icons/fa';
import HttpClient from '../Http/HttpClient'

const StepperCreateCommunityForm = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);


  const [formData, setFormData] = useState({
    communityName: '',
    contactMethod: '',
    commitmentLevel: '',
    communityVision: '',
    description: '',
    goals: '',
    category: '',
    audience: '',
    longTermObjectives: ''
  });;

  const commUnityCreation = async () => {

    if (!isStepComplete()) return

    try{
      const res = await HttpClient.postData("/unity/create", formData)

      if(res.status == "failure") {
        console.log("Something went wrong")
        return
      } 
      
      onCancel()

    }catch{
      console.log('Something is wrong')
    }


  }


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {isStepComplete() && setCurrentStep(prev => Math.min(prev + 1, 5))};
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const steps = [
    { icon: <FaUser className="w-5 h-5" />},
    { icon: <FaEnvelope className="w-5 h-5" /> },
    { icon: <FaListAlt className="w-5 h-5" /> },
    { icon: <FaBullseye className="w-5 h-5" />},
    { icon: <FaFileAlt className="w-5 h-5" /> },
  ];
  
  const isStepComplete = () => {
    switch(currentStep) {
      case 1:
        return formData.communityName.trim() !== '';
      case 2:
        return formData.category.trim() !== '' && formData.audience.trim() !== '';
      case 3:
        return formData.contactMethod.trim() !== '' && formData.commitmentLevel.trim() !== ''
      case 4:
        return formData.communityVision.trim() !== '' && formData.longTermObjectives.trim() !== ''
         && formData.goals.trim() !== ''
      case 5:
        return formData.description.trim() !== '';
      default:
        return true;
    }
  };
  

  const renderStep = () => {
    switch(currentStep) {
      case 1: // Community Basics
        return (
          <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="communityName" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What's your community name?</label>
              <input
                type="text"
                id="communityName"
                name="communityName"
                value={formData.communityName}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
          </div>
            {/* Location */}
          </div>
        );
      case 2: // Community Focus
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What category best describes your community?</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full text-lg p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="audience" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Who is the intended audience or group of people this community aims to serve?</label>
              <input
                type="text"
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

          </div>
        );
      case 3: // Contact & Commitment
        return (
          <div className="space-y-4">
            <div className="space-y-4">

            <div>
              <label htmlFor="contactMethod" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What's the best way to contact your community?</label>
              <input
                type="text"
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div>
              <label htmlFor="commitmentLevel" className="block text-lg font-medium text-gray-700 dark:text-gray-300">How much time and effort are you willing to invest in managing and growing this community?</label>
              <input
                type="text"
                id="commitmentLevel"
                name="commitmentLevel"
                value={formData.commitmentLevel}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
          </div>
          </div>
        );
      case 4: // Vision & Goals
        return (
            <div className="space-y-4">

            <div>
              <label htmlFor="communityVision" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What is your community aiming for, and what do you envision it achieving in the long run?</label>
              <input
                type="text"
                id="communityVision"
                name="communityVision"
                value={formData.communityVision}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

              <div>
                <label htmlFor="longTermObjectives" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What are the long-term objectives of your community?</label>
                <textarea
                  id="longTermObjectives"
                  name="longTermObjectives"
                  value={formData.longTermObjectives}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full text-lg p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                ></textarea>
              </div>


              <div>
                <label htmlFor="goals" className="block text-lg font-medium text-gray-700 dark:text-gray-300">What are the goals of your community?</label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full text-lg p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                ></textarea>
              </div>
          </div>
        );
      case 5: // Final Details
        return (
          <div className="space-y-4">

            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Describe your community and its purpose:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full text-lg p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              ></textarea>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-full">
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index + 1 <= currentStep
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-500 dark:text-gray-400"
            } ${
              index < steps.length - 1 ? "w-full" : ""
            } after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
              index + 1 < currentStep
                ? "after:border-blue-100 dark:after:border-blue-100"
                : "after:border-gray-100 dark:after:border-gray-700"
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
                index + 1 <= currentStep
                  ? "bg-blue-50 dark:bg-white"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {step.icon}
            </div>
            <span className="hidden sm:inline-flex sm:ml-2">{step.title}</span>
          </li>
        ))}
      </ol>
      {/* Main */}
      <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
        {renderStep()}
      </form>

        {/* Footer */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Previous
          </button>
        )}
        {currentStep < 5 ? (
          <button
            type="button"
            onClick={nextStep}
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={commUnityCreation}
            type="submit"
            className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Community
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperCreateCommunityForm;