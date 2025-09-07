import React, { useState } from "react";
import { useCart } from "../utilitys/cartContext";
import { NIGERIAN_STATES, NIGERIAN_CITIES } from "../utilitys/state";
import { NavLink } from "react-router-dom";
import Dropdown from "../components/dropDown";

const Checkout = () => {
  const { cartItems, subtotal, discount, vatAmount, totalWithVAT } = useCart();
  const SHIPPING_COST = 2000;

  const formatPrice = (price) => `₦${Number(price || 0).toLocaleString()}`;

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{11}$/.test(phone)) newErrors.phone = "Phone number must be 11 digits";
    if (!selectedState) newErrors.state = "Please select a state";
    if (!selectedCity) newErrors.city = "Please select a city";
    if (!address.trim()) newErrors.address = "Delivery address is required";
    return newErrors;
  };

  // Handle Proceed
  const handleProceed = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if valid

    const payload = {
      customer: {
        fullName,
        email,
        phone,
      },
      shipping: {
        state: selectedState,
        city: selectedCity,
        address,
      },
      order: {
        items: cartItems.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          color: item.color || null,
          variant: item.variant || null,
          total: item.price * item.quantity,
        })),
        summary: {
          subtotal,
          discount,
          vat: vatAmount,
          shipping: SHIPPING_COST,
          grandTotal: totalWithVAT + SHIPPING_COST,
        },
      },
    };

    console.log("Checkout Payload:", payload);

    // 👉 Replace with API call if needed
    // fetch("/api/checkout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="min-h-screen sm:pt-16 md:pt-36 bg-gradient-to-t from-purple-100 via-yellow-50 to-primary-950 p-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary-100 mb-10 mt-8">
        Checkout
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white/20 backdrop-blur-lg w-full max-w-3xl rounded-2xl p-10 shadow-md text-center text-gray-800 flex flex-col items-center gap-4">
          <p>Your cart is empty.</p>
          <NavLink
            to="/shop"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow hover:bg-blue-700 transition"
          >
            Go to Shop
          </NavLink>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            {/* Customer Info */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Info</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 bg-white/30 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-white/30 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-white/30 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-md relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <Dropdown
                    options={NIGERIAN_STATES}
                    selected={selectedState}
                    onSelect={(val) => {
                      setSelectedState(val);
                      setSelectedCity("");
                    }}
                    placeholder="Select State"
                  />
                  {errors.state && (
                    <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <Dropdown
                    options={selectedState ? NIGERIAN_CITIES[selectedState] : []}
                    selected={selectedCity}
                    onSelect={(val) => setSelectedCity(val)}
                    placeholder="Select City"
                    disabled={!selectedState}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-white/30 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full md:w-96 flex flex-col gap-6">
            <div className="bg-white/20 backdrop-blur-lg space-y-8 rounded-2xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-200 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {item.product_name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          {item.color && (
                            <span
                              className="px-2 py-1 rounded-full text-white text-xs"
                              style={{ backgroundColor: item.color }}
                            >
                              {item.color}
                            </span>
                          )}
                          {item.variant?.length && (
                            <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                              {item.variant.length}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-medium">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-800">
                      ₦{Number(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200 flex justify-between items-center">
                  <p className="text-green-700 text-lg font-semibold">Discount:</p>
                  <p className="text-green-600 font-bold">- {formatPrice(discount)}</p>
                </div>
                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>VAT (7.5%):</span>
                  <span>{formatPrice(vatAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-semibold">
                  <span>Shipping:</span>
                  <span>{formatPrice(SHIPPING_COST)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold text-xl">
                  <span>Total:</span>
                  <span>{formatPrice(totalWithVAT + SHIPPING_COST)}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <div className="w-full mt-6">
                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg text-center hover:scale-105 transition-transform"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
