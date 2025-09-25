import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { TextInput, Textarea, Button, Spinner } from "flowbite-react";
import SweetAlert from "../utilitys/sweetAlert";
import { fetchServices } from "../utilitys/services";
import { createAppointmentService } from "../utilitys/appointment";
import { formatAmount } from "../utilitys/formatAmount";

function Appointment() {
  // States
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // User info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Time slots
  const defaultTimeslots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];
  const sundayTimeslots = ["12:30 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM"];
  const getTimeslots = () => {
    if (!date) return defaultTimeslots;
    const day = new Date(date).getDay(); // 0 = Sunday
    return day === 0 ? sundayTimeslots : defaultTimeslots;
  };

  // Fetch services dynamically
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const result = await fetchServices();
        if (result.success) {
          const mappedServices = result.services.map((s) => ({
            id: s.service_id,
            title: s.service_name,
            price: s.price,
          }));
          setServices(mappedServices);
        } else {
          await SweetAlert.alert("Error", result.message, "error");
        }
      } catch (err) {
        console.error(err);
        await SweetAlert.alert("Error", "Failed to fetch services", "error");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  // Handle appointment confirmation
  const handleConfirm = async () => {
    if (!fullName || !email || !phone || !whatsapp || !address || !selectedService || !date || !time || !paymentMethod) {
      SweetAlert.alert("Missing Details", "Please fill all booking details.", "warning");
      return;
    }

    const confirmed = await SweetAlert.confirm(
      "Confirm Appointment",
      "Are you sure you want to confirm this appointment?",
      "Yes, Confirm",
      "Cancel"
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      const result = await createAppointmentService({
        fullName,
        email,
        phone,
        whatsapp,
        address,
        serviceId: selectedService.id,
        price: selectedService.price,
        date,
        time,
        notes,
        paymentMethod,
      });

      if (result.success) {
        // Clear form fields
        setFullName(""); setEmail(""); setPhone(""); setWhatsapp(""); setAddress(""); setNotes("");
        setSelectedService(null); setDate(null); setTime(""); setPaymentMethod("");

        // If payment method is online, redirect to payment link
        if (paymentMethod.toLowerCase() === "pay online" && result.paymentLink) {
          window.location.href = result.paymentLink;
          return;
        }

        await SweetAlert.alert("Success", result.message, "success");
      } else {
        await SweetAlert.alert("Error", result.message, "error");
      }

    } catch (err) {
      console.error("Error booking appointment:", err);
      await SweetAlert.alert("Error", "Server error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 sm:px-2 bg-gradient-to-t pt-28 from-purple-100 via-yellow-50 to-purple-950">
      <div className="p-6 md:max-w-5xl md:mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Book Your Appointment</h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <div>
            <label className="flex items-center gap-2 font-medium mb-2"><FaUser className="text-primary-700" /> Full Name</label>
            <TextInput type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" required />
          </div>
          <div>
            <label className="flex items-center gap-2 font-medium mb-2"><FaEnvelope className="text-primary-700" /> Email</label>
            <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" required />
          </div>
          <div>
            <label className="flex items-center gap-2 font-medium mb-2"><FaPhone className="text-primary-700" /> Phone</label>
            <TextInput type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" required />
          </div>
          <div>
            <label className="flex items-center gap-2 font-medium mb-2"><FaPhone className="text-green-500" /> WhatsApp</label>
            <TextInput type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+234 800 000 0000" required />
          </div>
        </div>

        {/* Address */}
        <div className="mb-8">
          <label className="flex items-center gap-2 font-medium mb-2"><FaEnvelope className="text-primary-700" /> Address</label>
          <TextInput type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required />
        </div>

        {/* Service Selection */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Choose a Service</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {services.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No services available at the moment.</p>
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedService(s)}
                className={`flex flex-col items-center justify-between px- py-2 rounded-lg border text-sm cursor-pointer transition-all
                  ${selectedService?.id === s.id ? "border-primary-700 bg-primary-700/50 font-semibold shadow-sm" : "border-gray-200 bg-white hover:border-primary-700/60"}`}
              >
                <span>{s.title}</span>
                <span className="text-primary-700 font-medium">{formatAmount(s.price)}</span>
              </div>
            ))
          )}
        </div>

        {/* Date & Time */}
        <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <label className="flex items-center gap-2 font-medium mb-3"><FaCalendarAlt className="text-primary-700" /> Date</label>
            <Calendar
              onChange={(d) => { setDate(d); setTime(""); }}
              minDate={new Date()}
              className="rounded-lg shadow-md p-2 w-full"
              value={date}
            />
          </div>
          <div className="p-4 bg-white border rounded-xl shadow-sm">
            <label className="flex items-center gap-2 font-medium mb-3"><FaClock className="text-primary-700" /> Time</label>
            <div className="grid grid-cols-3 gap-3">
              {getTimeslots().map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`px-3 py-2 rounded-lg border shadow-sm transition ${time === slot ? "bg-primary-700 text-white border-primary-700" : "bg-white border-gray-300 text-gray-700 hover:bg-primary-700/50"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10">
          <label className="font-medium mb-2 block">Special Requests / Notes</label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Please prepare hair coloring tools..." rows={4} />
        </div>

        {/* Payment Method */}
        <div className="mb-10">
          <label className="font-medium mb-2 block">Payment Method</label>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {["Pay Online", "Pay in Shop"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`px-4 py-2 rounded-lg border shadow-sm transition
                  ${paymentMethod === method ? "bg-primary-700 text-white border-primary-700" : "bg-white border-gray-300 text-gray-700 hover:bg-primary-700/50"}`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <Button onClick={handleConfirm} className="px-8 py-3 font-semibold bg-primary-600 rounded-lg" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" /> Processing...
              </div>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
