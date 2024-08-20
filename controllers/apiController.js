const { Api } = require('../models');

exports.getApi = async (req, res) => {
  try {
    const api = await Api.findAll();

    if (!api) {
      return res.status(404).json({ error: 'API not found' });
    }

    res.json(api);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve API' });
  }
};

exports.getApiById = async (req, res) => {
  try {
    const api = await Api.findByPk(req.params.id);

    if (!api) {
      return res.status(404).json({ error: 'API not found' });
    }

    res.json(api);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve API' });
  }
};

exports.createApi = async (req, res) => {
  try {
    const { apiUrl } = req.body;
    const newApi = await Api.create({ apiUrl });

    res.status(201).json(newApi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create API' });
  }
};

exports.updateApi = async (req, res) => {
  try {
    const api = await Api.findByPk(req.params.id);

    if (!api) {
      return res.status(404).json({ error: 'API not found' });
    }

    await api.update(req.body);
    res.json(api);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update API' });
  }
};

exports.deleteApi = async (req, res) => {
  try {
    const api = await Api.findByPk(req.params.id);

    if (!api) {
      return res.status(404).json({ error: 'API not found' });
    }

    await api.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete API' });
  }
};
