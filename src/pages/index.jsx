// src/pages/index.jsx
import React from 'react';
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <div className="h-full flex items-center justify-center text-gray-700">
        <p className="text-lg">Contenido principal de la página.</p>
      </div>
    </Box>
  );
}
