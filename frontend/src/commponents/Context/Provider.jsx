import { useState } from "react";
import { Authcontext} from "./Authcontext";

const data = [
  {
    id: 1,
    name: "Murugan",
    age: 26,
    mobile: "9123456780",
    gender: "Male",
    salary: "₹550/day",
    address: "Trichy, TN",
    role: "Helper",
    image: "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    roleColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "Priya",
    age: 32,
    mobile: "9896543210",
    gender: "Female",
    salary: "₹500/day",
    address: "Villupuram, TN",
    role: "Mason",
    image: "https://tse1.mm.bing.net/th/id/OIP.ulsbij1xLwgWJTJJGGSWnwAAAA?pid=ImgDet&w=267&h=400&rs=1&o=7&rm=3",
    roleColor: "bg-purple-500"
  },
  {
    id: 3,
    name: "Paras",
    age: 28,
    mobile: "6896543267",
    gender: "Male",
    salary: "₹1500/day",
    address: "Ariyalur, TN",
    role: "Electrician",
    image: "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    roleColor: "bg-orange-500"
  },
  {
    id: 4,
    name: "Dinesh",
    age: 32,
    mobile: "8896943228",
    gender: "Male",
    salary: "₹1100/day",
    address: "Chennai, TN",
    role: "Carpenter",
    image: "https://tse3.mm.bing.net/th/id/OIP.mErBxHyCU2yCzs5UHw12cQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    roleColor: "bg-green-600"
  },{
    id: 5,
    name:"sakthi",
    age:29,
    mobile:"9871234560",
    gender:"Male",
    image: "https://tse3.mm.bing.net/th/id/OIP.mErBxHyCU2yCzs5UHw12cQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    salary:"₹700/day",
    address:"Coimbatore, TN", 
  }
];

const materialsData=[
  {
    id: 1,
    name: "Cement",
    category: "Binding Material",
    available: true,
    edit:"Edit",
    delete:"Delete"
  },
  {
    id: 2,
    name: "Sand",
    category: "Aggregate",
    available: true,
    edit:"Edit",
    delete:"Delete"
  },
  {
    id: 3,
    name: "Steel (TMT Bars)",
    category: "Reinforcement",
    available: true,
    edit:"Edit",
    delete:"Delete"
  },
  {
    id: 4,
    name: "Bricks & Blocks",
    category: "Masonry",
    available: false,
    edit:"Edit",
    delete:"Delete"
  },
  {
    id: 5,
    name: "Tiles & Flooring",
    category: "Finishing",
    available: true,
    edit:"Edit",
    delete:"Delete"
  }
];
const stocksdata = [
  {
    id: 1,
    name: "Cement",
    image: "cement.png",
    alt: "cement",
    details: [
      { label: "Unit", value: "Bag" },
      { label: "Available Quantity", value: "1200 bags (50 kg each)" },
      { label: "Grade", value: "OPC 43 / PPC" },
      { label: "Storage", value: "Covered warehouse, moisture-protected" }
    ]
  },
  {
    id: 2,
    name: "Sand",
    image: "sand.jpg",
    alt: "sand",
    details: [
      { label: "Type", value: "River Sand / M-Sand" },
      { label: "Unit", value: "Ton" },
      { label: "Available Quantity", value: "90 tons" },
      { label: "Quality", value: "Clean, well-graded, fine aggregate" }
    ]
  },
  {
    id: 3,
    name: "Steel",
    image: "steel.png",
    alt: "steel",
    details: [
      { label: "Brand", value: "Tata Tiscon / JSW Steel" },
      { label: "Available Quantity", value: "25 tons" },
      { label: "Grade", value: "Fe500D" },
      { label: "Length", value: "12 m standard" },
      { label: "Coating", value: "Anti-rust" }
    ]
  },
  {
    id: 4,
    name: "Bricks",
    image: "bricks.jpg",
    alt: "bricks",
    details: [
      { label: "Type", value: "Fly-ash / Red Clay / Concrete Block" },
      { label: "Available Quantity", value: "30,000 pcs" },
      { label: "Unit", value: "Piece" },
      { label: "Size", value: "230 x 115 x 75 mm" },
      { label: "Strength", value: "3.5 - 5 MPa" }
    ]
  },
  {
    id: 5,
    name: "Tiles",
    image: "tiles.jpg",
    alt: "tiles",
    details: [
      { label: "Brand", value: "Kajaria / Somany / Nitco" },
      { label: "Available Quantity", value: "500 boxes" },
      { label: "Unit", value: "Box (1.44 m² each)" },
      { label: "Type", value: "Vitrified / Ceramic / Granite" },
      { label: "Finish", value: "Glossy / Matte" }
    ]
  }
];

const Provider = ({ children }) => {
    const [labourdetail, setLabourdetail] = useState(data);
    const [materialsdetail, setMaterialsdetail] = useState(materialsData);
    const [materialstocks, setMaterialstocks] = useState(stocksdata);

    return (
        <Authcontext.Provider value={{ 

        labourdetail, setLabourdetail,
        materialsdetail,setMaterialsdetail,
        materialstocks,setMaterialstocks

        }}>
          {children}
        </Authcontext.Provider>
    );
}   

export default Provider;