import React from "react";

const MedLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-50 bg-opacity-10 z-50">
      <svg viewBox="0 0 200 100" className="w-40 h-20">
        <polyline
          points="0,50 40,50 55,20 70,80 85,50 120,50 135,10 150,90 165,50 200,50"
          className="
            fill-none
            stroke-[#6E7DFF]
            stroke-[4]
            [stroke-dasharray:400]
            [stroke-dashoffset:400]
            animate-[ekgDraw_2s_linear_infinite]
          "
        />
      </svg>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes ekgDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MedLoader;
