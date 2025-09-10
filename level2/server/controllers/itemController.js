import Item from '../models/Item.js';



export const listItems = async (req, res) => {
     try {
       const items = await Item.find({ owner: req.user.id }).sort({ createdAt: -1 });
       console.log("Found items:", items);
       return res.json({ success: true, items });
     } catch (error) {
       console.error(error);
       return res.status(500).json({ success: false, message: error.message });
}
};

export const createItem = async (req, res) => {
    try {
      const payload = { ...req.body, owner: req.user.id };
      const item = await Item.create(payload);
      return res.status(201).json({ success: true, item });
   } catch (error) {
      console.error(error);
     return res.status(500).json({ success: false, message: error.message });
}
};

export const updateItem = async (req, res) => {
    try {
       const updated = await Item.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, req.body, { new: true });
       if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
       return res.json({ success: true, item: updated });
    } catch (error) {
       console.error(error);
       return res.status(500).json({ success: false, message: error.message });
}
};

export const deleteItem = async (req, res) => {
     try {
       const deleted = await Item.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
       if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
       return res.json({ success: true, message: 'Deleted' });
     } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
}
};