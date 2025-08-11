import { VILLAS } from '@/app/data/Villas';
import { COLORS } from '@/app/theme/colors';
import { Villa } from '@/app/types/types';
import { Check, Home, Users } from 'lucide-react';
import React from 'react'

interface VillaSelectionProps {
  selectedVilla: Villa | null;
  onVillaSelect: (villa: Villa) => void;
  onNext: () => void;
}

const VillaSelection: React.FC<VillaSelectionProps> = ({ selectedVilla, onVillaSelect, onNext }) => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h2
          className="mb-4 text-3xl font-light"
          style={{ color: COLORS.primary }}
        >
          Choose Your Villa
        </h2>
        <p
          className="text-lg font-light"
          style={{ color: COLORS.primary, opacity: 0.8 }}
        >
          Select from our collection of luxury villas, each offering unique
          experiences
        </p>
      </div>

      <div className="grid gap-8 md:gap-12">
        {VILLAS.map((villa) => (
          <div
            key={villa.id}
            className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ${
              selectedVilla?.id === villa.id
                ? "ring-2 ring-opacity-50"
                : "hover:shadow-xl"
            } ${selectedVilla?.id === villa.id ? "ring-[var(--villa-ring-color)]" : ""}`}
            style={
              selectedVilla?.id === villa.id
                ? { ["--villa-ring-color" as any]: COLORS.primary }
                : undefined
            }
            onClick={() => onVillaSelect(villa)}
          >
            <div className="grid gap-0 md:grid-cols-2 md:h-100">
              <div className="relative ">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full object-cover h-100"
                />
                <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1">
                  <span
                    className="text-sm font-medium"
                    style={{ color: COLORS.primary }}
                  >
                    {villa.price}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3
                      className="mb-2 text-2xl font-light"
                      style={{ color: COLORS.primary }}
                    >
                      {villa.name}
                    </h3>
                    <div
                      className="flex items-center gap-4 text-sm"
                      style={{ color: COLORS.primary, opacity: 0.7 }}
                    >
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Up to {villa.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>
                          {villa.bedrooms} bedroom
                          {villa.bedrooms > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedVilla?.id === villa.id && (
                    <div className="flex-shrink-0">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <p
                  className="mb-6 leading-relaxed font-light"
                  style={{ color: COLORS.primary, opacity: 0.8 }}
                >
                  {villa.description}
                </p>

                <div className="mb-6">
                  <h4
                    className="mb-3 text-sm font-medium tracking-wide uppercase"
                    style={{ color: COLORS.primary }}
                  >
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {villa.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm font-light"
                        style={{ color: COLORS.primary, opacity: 0.8 }}
                      >
                        <span
                          className="mt-1.5 mr-2 h-1 w-1 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        ></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {villa.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="rounded-full border px-3 py-1 text-xs font-light"
                      style={{
                        borderColor: COLORS.primary,
                        backgroundColor:
                          selectedVilla?.id === villa.id
                            ? COLORS.primary
                            : "transparent",
                        color:
                          selectedVilla?.id === villa.id
                            ? COLORS.light
                            : COLORS.primary,
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVilla && (
        <div className="mt-12 text-center">
          <button
            onClick={onNext}
            className="px-12 py-4 text-sm tracking-widest uppercase transition-all hover:opacity-90"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.light,
            }}
          >
            Continue with {selectedVilla.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default VillaSelection;