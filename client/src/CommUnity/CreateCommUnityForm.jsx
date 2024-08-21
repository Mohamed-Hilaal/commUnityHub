import React, { useState } from 'react';

const CreateCommunityForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    communityName: '',
    location: '',
    category: '',
    otherCategory: '',
    description: '',
    contactInfo: '',
    profile: '',
    isHiring: false,
    aimingField: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="communityName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Community Name</label>
        <input
          type="text"
          id="communityName"
          name="communityName"
          value={formData.communityName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Select location</option>
          <option value="office">Office</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Select category</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </div>

      {formData.category === 'other' && (
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specify Category</label>
          <input
            type="text"
            id="otherCategory"
            name="otherCategory"
            value={formData.otherCategory}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
      )}

      <div className="col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        ></textarea>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Info</label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="profile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile (optional)</label>
        <input
          type="text"
          id="profile"
          name="profile"
          value={formData.profile}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isHiring"
            checked={formData.isHiring}
            onChange={handleChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Is Hiring</span>
        </label>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="aimingField" className="block text-sm font-medium text-gray-700 dark:text-gray-300">What are you aiming for?</label>
        <input
          type="text"
          id="aimingField"
          name="aimingField"
          value={formData.aimingField}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="col-span-2 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Community
        </button>
      </div>
    </form>
  );
};

export default CreateCommunityForm;