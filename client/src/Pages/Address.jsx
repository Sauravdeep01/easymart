import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPlus, FaTrash, FaEdit, FaHome, FaBriefcase } from 'react-icons/fa';

const Address = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: 'Home',
            name: 'Saurav Deep',
            phone: '9876543210',
            address: 'H-204, Green Heights, Boring Road',
            locality: 'Opposite P&M Mall',
            city: 'Patna',
            state: 'Bihar',
            pincode: '800001',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            name: 'Saurav Deep',
            phone: '8877665544',
            address: 'Tower B, 4th Floor, IT Park',
            locality: 'Phase 2, Industrial Area',
            city: 'Patna',
            state: 'Bihar',
            pincode: '800013',
            isDefault: false
        }
    ]);

    return (
        <div className="border-t pt-14 px-8 min-h-screen bg-gray-50 pb-20">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold font-serif bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent uppercase tracking-wider">Saved Addresses</h2>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{addresses.length} Saved</span>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                        <FaPlus /> ADD NEW ADDRESS
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {addresses.map((addr) => (
                        <div key={addr.id} className={`bg-white rounded-3xl shadow-sm border p-8 flex flex-col md:flex-row gap-6 relative group hover:shadow-xl transition-all duration-500 ${addr.isDefault ? 'border-orange-500' : 'border-gray-100'}`}>

                            {addr.isDefault && (
                                <div className="absolute top-0 right-10 bg-orange-600 text-white px-4 py-1 rounded-b-xl text-[10px] font-bold uppercase tracking-widest">
                                    Default Address
                                </div>
                            )}

                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                {addr.type === 'Home' ? <FaHome size={24} /> : <FaBriefcase size={24} />}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="font-bold text-xl text-gray-900">{addr.name}</h3>
                                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">{addr.type}</span>
                                </div>
                                <div className="space-y-1 text-gray-600">
                                    <p className="font-medium">{addr.address}</p>
                                    <p className="font-medium">{addr.locality}</p>
                                    <p className="font-medium">{addr.city}, {addr.state} - <span className="text-gray-900 font-bold">{addr.pincode}</span></p>
                                    <p className="pt-3 font-bold text-gray-900 flex items-center gap-2">
                                        <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Mobile:</span> {addr.phone}
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="flex items-center gap-2 text-gray-700 text-xs font-bold border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                                        <FaEdit /> EDIT
                                    </button>
                                    <button className="flex items-center gap-2 text-red-500 text-xs font-bold border border-red-100 px-5 py-2.5 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                                        <FaTrash /> REMOVE
                                    </button>
                                    {!addr.isDefault && (
                                        <button className="text-orange-600 text-xs font-bold py-2.5 px-2 hover:underline">
                                            SET AS DEFAULT
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Mockup */}
                {addresses.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-orange-200 mb-6 animate-pulse">
                            <FaMapMarkerAlt size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Saved Addresses!</h3>
                        <p className="text-gray-500 mb-8 max-w-xs text-center font-medium">Add your shipping details for a faster checkout experience next time.</p>
                        <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all uppercase tracking-widest text-sm">
                            Add New Address
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Address;
