const Service = require("../models/Service");

const getServices = async (req, res) => {
  try {
    const service = await Service.find();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findOne({ _id: id });
    if (!service) {
      return res
        .status(500)
        .json({ status: false, message: "Serviço não encontrado" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const createService = async (req, res) => {
  const { service, price } = req.body;

  if (!service || !price) {
    return res
      .status(400)
      .json({ status: false, message: "Dados incompletos!" });
  }

  const newService = {
    service,
    price,
  };

  try {
    await Service.create(newService);
    res
      .status(200)
      .json({ status: true, message: "Serviço criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { service, price } = req.body;

  if (!service && !price) {
    return res
      .status(422)
      .json({ status: false, message: "Dados incompletos!" });
  }

  const newService = {
    service,
    price,
  };

  try {
    const updateService = await Service.updateOne({ _id: id }, newService);
    if (updateService.matchedCount == 0) {
      res.status(200).json({ message: "Não foi possível atualizar!" });
      return;
    }
    res.status(200).json(updateService);
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

const deleteService = async (req, res) => {
  const { id } = req?.params;
  const service = await Service.findOne({ _id: id });
  if (!service) {
    return res.status(500).json({ message: "Serviço não encontrado" });
  }
  try {
    await Service.deleteOne({ _id: id });
    res.status(200).json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
  getServiceById,
};
