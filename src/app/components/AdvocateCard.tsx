import { FaPhoneAlt, FaUserMd, FaMapMarkerAlt, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { formatPhoneNumber } from "../utils/formatters";
import { Advocate } from "../models/advocate";
import React, { useState } from "react";

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

function CollapsibleSpecialties({ specialties }: { specialties: string[] }) {
  const [open, setOpen] = useState(false);
  const VISIBLE_COUNT = 4;
  const visible = open ? specialties : specialties.slice(0, VISIBLE_COUNT);
  const hiddenCount = specialties.length - VISIBLE_COUNT;

  if (!specialties.length) return null;
  return (
    <div className="flex flex-col gap-2 mt-2 min-w-0">
      <div className="flex flex-wrap gap-2">
        {visible.map((s, idx) => (
          <span
            key={idx}
            className="inline-block rounded-full bg-[#e6f2ff] text-[#347866] px-3 py-1 text-xs font-semibold break-all max-w-xs border border-[#b5c9d6]"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
        {!open && hiddenCount > 0 && (
          <button
            className="inline-block rounded-full bg-[#347866] text-white px-3 py-1 text-xs font-semibold border border-[#b5c9d6] hover:bg-[#2b6cb0] transition-colors"
            onClick={() => setOpen(true)}
          >
            +{hiddenCount} more
          </button>
        )}
        {open && specialties.length > VISIBLE_COUNT && (
          <button
            className="inline-block rounded-full bg-[#347866] text-white px-3 py-1 text-xs font-semibold border border-[#b5c9d6] hover:bg-[#2b6cb0] transition-colors"
            onClick={() => setOpen(false)}
          >
            -
          </button>
        )}
      </div>
    </div>
  );
}

const AdvocateCard = ({ advocate, className = "" }: { advocate: Advocate; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-3 flex flex-col gap-4 border border-black hover:shadow-2xl transition-shadow relative overflow-hidden min-w-0 w-full ${className}`}>
    <div className="flex items-center gap-4 mb-2">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#e6f2ff] flex items-center justify-center text-2xl font-bold text-[#347866] border-2 border-[#b5c9d6] shadow-sm">
        {getInitials(advocate.firstName, advocate.lastName)}
      </div>
      <div>
        <div className="font-bold text-xl text-[#347866] flex items-center gap-2">
          <FaUserMd className="inline-block text-[#38b2ac]" />
          {advocate.firstName} {advocate.lastName}
        </div>
        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
          <FaGraduationCap className="inline-block text-[#b5c9d6]" />
          {advocate.degree}
          <FaMapMarkerAlt className="inline-block text-[#b5c9d6] ml-2" />
          {advocate.city}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <FaPhoneAlt className="text-[#38b2ac]" />
          <a
            href={`tel:${advocate.phoneNumber}`}
            className="text-[#347866] underline font-medium text-sm sm:text-base"
          >
            {formatPhoneNumber(advocate.phoneNumber)}
          </a>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
      <FaBriefcase className="inline-block text-[#b5c9d6]" />
      {advocate.yearsOfExperience} yrs experience
    </div>
    <CollapsibleSpecialties specialties={advocate.specialties} />
  </div>
);

export default AdvocateCard; 