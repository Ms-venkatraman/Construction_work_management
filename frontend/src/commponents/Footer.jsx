import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-orange-400">ConstructionPro</h3>
                        <p className="text-gray-300">
                            Construction management platform for tracking materials, labour, and stock updates.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="flex flex-col">
                            <Link to='/home' className="text-gray-300 hover:text-orange-400 transition-colors">Dashboard</Link>
                            <Link to='/materials' className="text-gray-300 hover:text-orange-400 transition-colors">Materials</Link>
                            <Link to='/labour' className="text-gray-300 hover:text-orange-400 transition-colors">Labour</Link>
                            <Link to='/stock' className="text-gray-300 hover:text-orange-400 transition-colors">Stocks</Link>
                            <Link to='/documentation' className="text-gray-300 hover:text-orange-400 transition-colors">Documentation</Link>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="text-gray-300 space-y-2">
                            <p>📞 +91 9360298754</p>
                            <p>✉️ support@construction.com</p>
                            <p>🏢 123 Site Ave, Construct City</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} ConstructionPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;