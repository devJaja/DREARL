
"use client";
import { useState } from "react";

const Register = () => {
  const [formType, setFormType] = useState("land");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 text-lg font-medium rounded-md ${
              formType === "land"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFormType("land")}
          >
            Register Land
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium rounded-md ${
              formType === "property"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setFormType("property")}
          >
            Register Property
          </button>
        </div>
        {formType === "land" ? <RegisterLandForm /> : <RegisterPropertyForm />}
      </div>
    </div>
  );
};

const RegisterLandForm = () => {
  const [formData, setFormData] = useState({
    numberOfPlots: "",
    state: "",
    lga: "",
    city: "",
    pricePerPlot: "",
    titleNumber: "",
    imageCID: "",
    coFoCID: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const requiredFields: (keyof typeof formData)[] = ["numberOfPlots", "state", "lga", "city", "pricePerPlot", "titleNumber", "imageCID", "coFoCID"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="numberOfPlots" className="block text-sm font-medium text-gray-700">
          Number of Plots
        </label>
        <input
          type="number"
          name="numberOfPlots"
          id="numberOfPlots"
          value={formData.numberOfPlots}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="lga" className="block text-sm font-medium text-gray-700">
          LGA
        </label>
        <input
          type="text"
          name="lga"
          id="lga"
          value={formData.lga}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="pricePerPlot" className="block text-sm font-medium text-gray-700">
          Price Per Plot
        </label>
        <input
          type="number"
          name="pricePerPlot"
          id="pricePerPlot"
          value={formData.pricePerPlot}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="titleNumber" className="block text-sm font-medium text-gray-700">
          Title Number
        </label>
        <input
          type="number"
          name="titleNumber"
          id="titleNumber"
          value={formData.titleNumber}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="imageCID" className="block text-sm font-medium text-gray-700">
          Image CID
        </label>
        <input
          type="text"
          name="imageCID"
          id="imageCID"
          value={formData.imageCID}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="coFoCID" className="block text-sm font-medium text-gray-700">
          Certificate of Occupancy CID
        </label>
        <input
          type="text"
          name="coFoCID"
          id="coFoCID"
          value={formData.coFoCID}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register Land
      </button>
    </form>
  );
};

const RegisterPropertyForm = () => {
  const [formData, setFormData] = useState({
    landIndex: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    price: "",
    imageCID: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const requiredFields: (keyof typeof formData)[] = ["landIndex", "numberOfRooms", "numberOfBathrooms", "price", "imageCID"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="landIndex" className="block text-sm font-medium text-gray-700">
          Land Index
        </label>
        <input
          type="number"
          name="landIndex"
          id="landIndex"
          value={formData.landIndex}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700">
          Number of Rooms
        </label>
        <input
          type="number"
          name="numberOfRooms"
          id="numberOfRooms"
          value={formData.numberOfRooms}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="numberOfBathrooms" className="block text-sm font-medium text-gray-700">
          Number of Bathrooms
        </label>
        <input
          type="number"
          name="numberOfBathrooms"
          id="numberOfBathrooms"
          value={formData.numberOfBathrooms}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="imageCID" className="block text-sm font-medium text-gray-700">
          Image CID
        </label>
        <input
          type="text"
          name="imageCID"
          id="imageCID"
          value={formData.imageCID}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Register Property
      </button>
    </form>
  );
};

export default Register;
