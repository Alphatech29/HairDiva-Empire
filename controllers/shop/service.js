const {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} = require("../../utility/service");

// Controller to handle creating a new service
const addService = async (req, res) => {
  try {
    const { serviceName, price } = req.body;

    if (!serviceName || price == null) {
      return res.status(400).json({
        success: false,
        message: "Service name and price are required",
      });
    }

    const result = await createService({ serviceName, price });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (err) {
    console.error("Error in addService controller:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Controller to fetch all services
const fetchServices = async (req, res) => {
  try {
    const result = await getAllServices();
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (err) {
    console.error("Error in fetchServices controller:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Controller to update a service by ID
const editServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceName, price } = req.body;

    if (!serviceName || price == null) {
      return res.status(400).json({
        success: false,
        message: "Service name and price are required",
      });
    }

    const result = await updateServiceById(id, { serviceName, price });

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (err) {
    console.error("Error in editServiceById controller:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Controller to delete a service by ID
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteServiceById(id);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (err) {
    console.error("Error in deleteService controller:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addService,
  fetchServices,
  editServiceById,
  deleteService,
};
