import mongoose from 'mongoose'
const registerschema=new mongoose.Schema({
    username:String,
    mobile:{unique:true,type:Number},
    // mail:String,
    confirmpassword:String||Number,
})

const registerModel=mongoose.model('register',registerschema);
export default registerModel

const labourschema=new mongoose.Schema({
    id:{unique:true,type:String},
    name:String,
    age:Number,
    mobile:Number,
    gender: String,
    address: String,
    role: String,
    image:String,
})
export const labourModel=mongoose.model('labours',labourschema);


const materialSchema=new mongoose.Schema({
    id:{type:String,unique:true},
    name:String,
    category:String,
    available:Boolean,
})
export const material=mongoose.model('materials',materialSchema);


// Detail sub-schema for dynamic properties
const detailSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    trim: true,
    default: ""
  }
}, { _id: false });

// Main stock schema
const stockSchema = new mongoose.Schema({
  id:String,
  name: {
    type: String,
    required: [true, 'Stock name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  alt: {
    type: String,
    trim: true,
    default: ""
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: [
      'Metals',
      'Wood',
      'Construction',
      'Plumbing',
      'Electrical',
      'Finishing',
      'Hardware',
      'Tools',
      'Safety',
      'General'
    ]
  },
  materialGrade: {
    type: String,
    trim: true,
    default: "Not specified"
  },
  unitPrice: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  purchaseDate: {
    type: Date,
    default: null
  },
  details: [detailSchema]
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create index for better performance
stockSchema.index({ name: 'text', category: 'text' });
stockSchema.index({ category: 1 });
stockSchema.index({ createdAt: -1 });

export const stocks = mongoose.model('Stock', stockSchema);


const maintenanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  updates: {
    type: String,
    required: true
  },
  siteImage: {
    preview: String,
    filename: String
  },
  materialsUsed: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }],
  labourDetails: [{
    name: {
      type: String,
      required: true
    },
    present: {
      type: Boolean,
      default: true
    },
    salary: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    expense: {
      type: Number,
      required: true
    }
  }],
  stockUpdates: [{
    name: {
      type: String,
      required: true
    },
    used: {
      type: Number,
      required: true
    }
  }],
  totalLabourExpense: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
maintenanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate total labour expense
  this.totalLabourExpense = this.labourDetails.reduce((sum, labour) => {
    return sum + (labour.present ? (labour.expense || 0) : 0);
  }, 0);
  
  next();
});

export const maintanance = mongoose.model('Maintenance', maintenanceSchema);