import React, { useState, useEffect } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import { GiScissors, GiComb, GiHairStrands } from "react-icons/gi";
import { formatAmount } from "../../utilitys/formatAmount";
import { createService, fetchServices, updateServiceById, deleteServiceById } from "../../utilitys/services";
import SweetAlert from "../../utilitys/sweetAlert";

const serviceIcons = {
  Haircut: <GiScissors className="text-pink-400 w-10 h-10" />,
  "Hair Styling": <GiComb className="text-purple-400 w-10 h-10" />,
  "Hair Coloring": <GiHairStrands className="text-indigo-400 w-10 h-10" />,
};

// Capitalize first letter of each word
const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const SalonService = () => {
  const [services, setServices] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [currentService, setCurrentService] = useState({ id: "", name: "", price: "" });
  const [loading, setLoading] = useState(false);

  // Load services on mount
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      const result = await fetchServices();
      if (result.success) {
        const mappedServices = result.services.map((s) => ({
          id: s.service_id.toString(),
          name: capitalizeWords(s.service_name),
          price: Number(s.price),
        }));
        setServices(mappedServices);
      } else {
        console.error("Failed to fetch services:", result.message);
        await SweetAlert.alert("Error", result.message, "error");
      }
      setLoading(false);
    };
    loadServices();
  }, []);

  const handleAddService = async () => {
    if (!currentService.name || !currentService.price) return;
    setLoading(true);
    try {
      const response = await createService({
        serviceName: currentService.name,
        price: Number(currentService.price),
      });

      if (response.success) {
        setServices([...services, {
          id: response.serviceId.toString(),
          name: capitalizeWords(currentService.name),
          price: Number(currentService.price),
        }]);
        setCurrentService({ id: "", name: "", price: "" });
        setModalType(null);
        await SweetAlert.alert("Success", "Service added successfully", "success");
      } else {
        await SweetAlert.alert("Error", response.message, "error");
      }
    } catch (err) {
      console.error(err);
      await SweetAlert.alert("Error", "Failed to add service", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = async () => {
    if (!currentService.name || !currentService.price) return;
    setLoading(true);
    try {
      const response = await updateServiceById(currentService.id, {
        serviceName: currentService.name,
        price: Number(currentService.price),
      });

      if (response.success) {
        setServices(services.map((s) =>
          s.id === currentService.id
            ? { ...s, name: capitalizeWords(currentService.name), price: Number(currentService.price) }
            : s
        ));
        setCurrentService({ id: "", name: "", price: "" });
        setModalType(null);
        await SweetAlert.alert("Success", "Service updated successfully", "success");
      } else {
        await SweetAlert.alert("Error", response.message, "error");
      }
    } catch (err) {
      console.error(err);
      await SweetAlert.alert("Error", "Failed to update service", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (service) => {
    const confirmed = await SweetAlert.confirm(
      "Delete Service",
      `Are you sure you want to delete ${service.name}?`,
      "Yes",
      "No"
    );

    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await deleteServiceById(service.id);
      if (response.success) {
        setServices(services.filter((s) => s.id !== service.id));
        await SweetAlert.alert("Deleted", "Service deleted successfully", "success");
      } else {
        await SweetAlert.alert("Error", response.message, "error");
      }
    } catch (err) {
      console.error(err);
      await SweetAlert.alert("Error", "Failed to delete service", "error");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, service = { id: "", name: "", price: "" }) => {
    setModalType(type);
    setCurrentService(service);
  };

  const closeModal = () => {
    setModalType(null);
    setCurrentService({ id: "", name: "", price: "" });
  };

  return (
    <div className="min-h-screen py-8 flex flex-col">
      <h1 className="text-2xl font-extrabold text-purple-700 w-full mb-5 drop-shadow-lg text-start">
        Our Salon Services
      </h1>

      {loading ? (
        <p className="text-center text-purple-700 font-semibold">Loading services...</p>
      ) : services.length === 0 ? (
        <div className="text-center text-purple-700 font-semibold mt-20">
          <p>No services available yet.</p>
          <button
            onClick={() => openModal("add")}
            className="mt-4 px-6 py-3 bg-purple-700 text-white rounded-2xl hover:scale-105 transition-transform"
          >
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  {serviceIcons[service.name] || <GiScissors className="text-pink-400 " />}
                  <span className="text-lg font-bold text-purple-800">{service.name}</span>
                </div>
                <div className="flex gap-3">
                  <HiPencil
                    className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
                    size={22}
                    onClick={() => openModal("edit", service)}
                  />
                  <HiTrash
                    className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                    size={22}
                    onClick={() => handleDeleteService(service)}
                  />
                </div>
              </div>
              <div className="mt-4 text-purple-900 font-extrabold text-base">
                {formatAmount(service.price)}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => openModal("add")}
        className="fixed bottom-12 right-12 bg-purple-700 text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-4xl"
      >
        <HiPlus />
      </button>

      {modalType && (modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fadeIn scale-100">
            <h2 className="text-3xl font-bold text-purple-800 mb-4 text-center">
              {modalType === "add" ? "Add Service" : "Edit Service"}
            </h2>
            <input
              type="text"
              placeholder="Service Name"
              value={currentService.name}
              onChange={(e) =>
                setCurrentService({ ...currentService, name: capitalizeWords(e.target.value) })
              }
              className="border border-purple-200 rounded-2xl p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={currentService.price}
              onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
              className="border border-purple-200 rounded-2xl p-4 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-4">
              <button
                onClick={modalType === "add" ? handleAddService : handleEditService}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-2xl hover:scale-105 transition-transform"
                disabled={loading}
              >
                {loading ? "Processing..." : modalType === "add" ? "Add" : "Save"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonService;
