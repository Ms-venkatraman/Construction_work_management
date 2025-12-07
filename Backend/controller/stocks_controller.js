import { stocks } from "../Model/constructionModel.js"

export const addstocks = async (req, res) => {
    const stock = req.body;
    try {
        const stocksdata = await stocks.create(stock);
        res.status(201).json({ message: "add data successfully", stocksdata });
    } catch (error) {
        console.log("something error in addstocks :", error.message);
        res.status(500).json({ error: "Failed to add stock", details: error.message });
    }
}

export const getstocks = async (req, res) => {
    try {
        const data = await stocks.find().sort({ createdAt: -1 });
        res.status(200).json({ msg: "data get successfull", stocks: data });
    } catch (error) {
        console.log("something error in getstocks :", error.message);
        res.status(500).json({ error: "Failed to fetch stocks", details: error.message });
    }
}

export const editstocks = async (req, res) => {
   // Update your editstock route to handle id field
    console.log(req.body);
  try {
    const { id, name, details,category,image} = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Stock ID is required' });
    } 
    // Find stock by id (crypto.randomUUID) instead of _id
    const updatedStock = await stocks.findOneAndUpdate(
      {_id:id}, // Find by id field
      { 
        name: name,
        details: details,
        category: category ,
        image:image
      },
      { new: true } // Return updated document
    );

    if (!updatedStock) {
      return res.status(404).json({ success: false, message: 'Stock not found' });
    }

    res.json({ success: true, message: 'Stock updated successfully', stock: updatedStock });
  } catch (error) {
    console.log('something error in editstocks :', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deletestock = async (req, res) => {
    const { id } = req.params;
    try {
      console.log('Deleting stock with ID:', id);
        const stockdelete = await stocks.findByIdAndDelete(id); // Use id from URL params
        
        if (!stockdelete) {
            return res.status(404).json({ msg: "Stock not found" });
        }

        res.status(200).json({ msg: "Stock deleted successfully", stock: stockdelete });
    } catch (error) {
        console.log("something error in deletestock :", error.message);
        res.status(500).json({ error: "Failed to delete stock", details: error.message });
    }
}