import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // ya './App.css' agar aapne waha pe add kiya hai


function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/buses?origin=${origin}&destination=${destination}`);
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Parcel Booking</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4">
        <input 
          type="text" 
          placeholder="Origin" 
          value={origin} 
          onChange={(e) => setOrigin(e.target.value)} 
          required 
          className="p-2 border border-gray-300 rounded-md"
        />
        <input 
          type="text" 
          placeholder="Destination" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
          required 
          className="p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">Search Buses</button>
      </form>

      <h2 className="text-xl font-semibold mt-4">Available Buses</h2>
      {loading ? (
        <p className="mt-4 text-gray-500">Loading...</p>
      ) : (
        <ul className="list-none p-0 mt-4 w-full max-w-md">
          {buses.length > 0 ? (
            buses.map(bus => (
              <li key={bus._id} className="p-4 border-b border-gray-200">
                {bus.busName} <br /> Bus Stop: {bus.route.join(' -> ')}
              </li>
            ))
          ) : (
            <p className="mt-4 text-gray-500">No buses found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
