import React from "react";

const SiteViewSkeleton = () => {
  return (
    <div>
      <div className="w-[50px] h-[25px] mb-4 bg-neutral-300 rounded-md"></div>
      <div className="w-[400px] h-[25px] mb-4 bg-neutral-200 rounded-md"></div>
      <div className="w-full rounded-xl relative grid grid-cols-2 gap-3 overflow-hidden h-[50vh]">
        <div className="w-full h-full bg-neutral-300 animate-pulse"></div>
        <div className="w-full h-full grid grid-cols-2 gap-2">
          <div className="w-full h-full bg-neutral-300 animate-pulse"></div>
          <div className="w-full h-full bg-neutral-300 animate-pulse"></div>
          <div className="w-full h-full bg-neutral-300 animate-pulse"></div>
          <div className="w-full h-full bg-neutral-300 animate-pulse"></div>
        </div>
      </div>
      <div className="flex mt-10 h-full gap-10">
        <div className="w-full h-[30vh] rounded-2xl bg-neutral-300 animate-pulse"></div>
        <div className="w-6/12 h-[30vh] rounded-2xl bg-neutral-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SiteViewSkeleton;
