"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [duureg, setDuureg] = useState("");
  const [khoroo, setKhoroo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.bestdelivery.mn/khoroo");
      const result = await res.json();

      console.log(result);
      console.log(result.data?.khoroo);
      
      setData(result || []);
    };

    fetchData();
  }, []);

  const handleReset = () => {
    setCity("");
    setDuureg("");
    setKhoroo("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow space-y-6">

        <h2 className="text-lg font-semibold text-center text-black">
          Location Selector
        </h2>

        <div className="flex flex-wrap gap-3 items-center">

          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDuureg("");
            }}
            className="flex-1 min-w-[150px] p-2 border rounded text-black"
          >
            <option value="">City</option>
            {data?.data?.city?.map((c, i) => (
              <option key={i} value={c.value}>
                {c.value}
              </option>
            ))}
          </select>

          <select
              value={duureg}
              onChange={(e) => setDuureg(e.target.value)}
              disabled={!city}
              className="flex-1 min-w-[150px] p-2 border rounded disabled:bg-gray-200 text-black"
            >
            <option value="">Duureg</option>
            {data?.data?.street
              ?.filter((d) => d.value === city)
              .map((d, i) => (
                <option key={i} value={d.label}>
                  {d.label}
                </option>
              ))}
          </select>

          <input
            type="text"
            placeholder="Khoroo"
            value={khoroo}
            onChange={(e) => setKhoroo(e.target.value)}
            className="flex-1 min-w-[150px] p-2 border rounded text-black"
          />

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            ✖
          </button>
        </div>

        <div className="border-t pt-4 text-sm space-y-1 text-black">
          <p><strong>City:</strong> {city || "No city"}</p>
          <p><strong>Duureg:</strong> {duureg || "No duureg"}</p>
          <p><strong>Khoroo:</strong> {khoroo || "No khoroo"}</p>
        </div>

      </div>
    </div>
  );
}