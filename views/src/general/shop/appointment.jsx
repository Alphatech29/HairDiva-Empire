import React, { useEffect, useState, useMemo } from "react";
import {
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  getAllAppointments,
  updateAppointmentById,
} from "../../utilitys/appointment";
import { formatAmount } from "../../utilitys/formatAmount";
import SweetAlert from "../../utilitys/sweetAlert";
import { TextInput } from "flowbite-react";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const response = await getAllAppointments();
    if (response.success) {
      setAppointments(response.data);
    }
    setLoading(false);
  };

  const getBadgeClasses = (type) => {
    switch (type) {
      case "Confirmed":
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
      case "Declined":
        return "bg-red-100 text-red-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDecline = async (id) => {
    const res = await updateAppointmentById(id, { status: "Cancelled" });
    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
      );
      if (selectedAppointment?.id === id)
        setSelectedAppointment((prev) => ({ ...prev, status: "Cancelled" }));
      SweetAlert.alert(
        "Declined",
        "Appointment has been cancelled.",
        "success"
      );
    }
  };

  const handleApprove = async (id, type) => {
    const payload =
      type === "Confirmed"
        ? { status: "Confirmed" }
        : { payment_status: "Paid" };
    const res = await updateAppointmentById(id, payload);
    if (res.success) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...payload } : a))
      );
      if (selectedAppointment?.id === id)
        setSelectedAppointment((prev) => ({ ...prev, ...payload }));
      SweetAlert.alert(
        "Success",
        `Updated ${type === "Confirmed" ? "status" : "payment"} successfully.`,
        "success"
      );
    }
  };

  // Filter appointments by search term only
  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (a) =>
        a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [appointments, searchTerm]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Appointments
          </h1>
          <p className="text-gray-500 mt-2 sm:mt-0">
            Review and manage all scheduled sessions
          </p>
        </div>

        {/* Search */}
        <div className="flex mb-6 w-full">
          <TextInput
            id="search"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            sizing="md"
            color="white"
          />
        </div>

        {/* Appointment Cards */}
        {loading ? (
          <p className="text-gray-600 text-lg animate-pulse">
            Loading appointments...
          </p>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <p className="text-xl font-medium">No appointments found</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
            {filteredAppointments.map((a) => (
              <div
                key={a.id}
                className="bg-white/80 backdrop-blur-lg shadow-xl hover:shadow-2xl rounded-md p-8 border border-gray-100 relative overflow-clip"
              >
                <div className="flex absolute top-0 left-0 right-0 justify-between">
                  <span
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm tracking-wide ${getBadgeClasses(
                      a.status
                    )}`}
                  >
                    {a.status}
                  </span>
                  <span className="px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm bg-primary-200 text-primary-800">
                    {a.payment_method}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-6 mt-4">
                  <div className="bg-gradient-to-br from-primary-300 to-primary-700 text-white p-2 rounded-2xl shadow-md">
                    <FaUser size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-base text-gray-900">
                      {a.full_name.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaPhone className="mr-1 text-gray-400" /> {a.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-700" />{" "}
                    {a.appointment_date}
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-primary-700" />{" "}
                    {a.appointment_time}
                  </p>
                  <p>
                    <span className="text-gray-500">Service:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {a.service_name}
                    </span>
                  </p>
                  <p className="flex items-center font-semibold text-gray-900">
                    {formatAmount(a.amount)}
                    <span
                      className={`text-xs ml-2 px-2 py-1 rounded-lg ${getBadgeClasses(
                        a.payment_status
                      )}`}
                    >
                      {a.payment_status || "Unpaid"}
                    </span>
                  </p>
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={() => setSelectedAppointment(a)}
                    className="mt-4 px-6 py-2.5 text-sm rounded-xl bg-gradient-to-r from-primary-200 to-primary-700 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-3xl relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
              Appointment Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base leading-relaxed">
              <p>
                <strong>Client:</strong>{" "}
                {selectedAppointment.full_name.toUpperCase()}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-gray-400" />
                {selectedAppointment.email}
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2 text-gray-400" />
                {selectedAppointment.phone}
              </p>
              <p className="flex items-center">
                <FaWhatsapp className="mr-2 text-green-500" />
                {selectedAppointment.whatsapp}
              </p>
              <p className="flex items-center col-span-2">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {selectedAppointment.address.toUpperCase()}
              </p>
              <p>
                <strong>Date:</strong> {selectedAppointment.appointment_date}
              </p>
              <p>
                <strong>Time:</strong> {selectedAppointment.appointment_time}
              </p>
              <p>
                <strong>Service:</strong> {selectedAppointment.service_name}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {formatAmount(selectedAppointment.amount)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getBadgeClasses(
                    selectedAppointment.status
                  )}`}
                >
                  {selectedAppointment.status}
                </span>
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getBadgeClasses(
                    selectedAppointment.payment_status
                  )}`}
                >
                  {selectedAppointment.payment_status || "Unpaid"}
                </span>
              </p>
              <p className="col-span-2">
                <strong>Payment Method:</strong>{" "}
                <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm bg-primary-200 text-primary-700">
                  {selectedAppointment.payment_method}
                </span>
              </p>
              {selectedAppointment.message && (
                <p className="col-span-2 italic border-l-4 border-[#f97316] pl-3 text-gray-600">
                  “{selectedAppointment.message}”
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() =>
                  handleApprove(selectedAppointment.id, "Confirmed")
                }
                className={`px-6 py-2.5 text-sm rounded-xl bg-green-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition ${
                  ["Confirmed", "Approved", "Declined"].includes(
                    selectedAppointment.status
                  )
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={["Confirmed", "Approved", "Declined"].includes(
                  selectedAppointment.status
                )}
              >
                Confirm Status
              </button>

              <button
                onClick={() => handleApprove(selectedAppointment.id, "Paid")}
                className={`px-6 py-2.5 text-sm rounded-xl bg-blue-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition ${
                  selectedAppointment.payment_status === "Paid"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={selectedAppointment.payment_status === "Paid"}
              >
                Mark as Paid
              </button>

              <button
                onClick={() => handleDecline(selectedAppointment.id)}
                className={`px-6 py-2.5 text-sm rounded-xl bg-red-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition ${
                  ["Cancelled", "Approved"].includes(selectedAppointment.status)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={["Cancelled", "Approved"].includes(
                  selectedAppointment.status
                )}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
