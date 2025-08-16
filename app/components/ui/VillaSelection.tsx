import { VILLAS } from '@/app/data/Villas';
import { COLORS } from '@/app/theme/colors';
import { Villa } from '@/app/types/types';
import { Check, Home, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface VillaSelectionProps {
  selectedVilla: Villa | null;
  onVillaSelect: (villa: Villa) => void;
  onNext: () => void;
}

const VillaSelection: React.FC<VillaSelectionProps> = ({
  selectedVilla,
  onVillaSelect,
  onNext,
}) => {
  return (
    <div className="mx-auto max-w-6xl pb-32">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-light" style={{ color: COLORS.primary }}>
          Choose Your Villa
        </h2>
        <p className="text-lg font-light opacity-80" style={{ color: COLORS.primary }}>
          Select from our collection of luxury villas, each offering unique experiences
        </p>
      </div>

      {/* Villas */}
      <div className="grid gap-8 md:gap-12">
        {VILLAS.map((villa) => (
          <div
            key={villa.id}
            onClick={() => onVillaSelect(villa)}
            className={`cursor-pointer overflow-hidden h-full rounded-lg bg-white shadow-lg transition-all duration-300 ${
              selectedVilla?.id === villa.id
                ? 'ring-2 ring-opacity-50 ring-[var(--villa-ring-color)]'
                : 'hover:shadow-xl'
            }`}
            style={
              selectedVilla?.id === villa.id
                ? { ['--villa-ring-color' as string]: COLORS.primary }
                : undefined
            }
          >
            <div className="grid gap-0 md:grid-cols-2 md:h-fit">
              {/* Villa Image */}
              <div className="relative">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  className="w-full object-cover h-full"
                  width={500}
                  height={300}
                />
                <div className="absolute top-4 right-4 rounded-full bg-white px-3 py-1 shadow-sm">
                  <span
                    className="text-sm font-medium"
                    style={{ color: COLORS.primary }}
                  >
                    {villa.price}
                  </span>
                </div>
              </div>

              {/* Villa Info */}
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
                      className="flex items-center gap-4 text-sm opacity-70"
                      style={{ color: COLORS.primary }}
                    >
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Up to {villa.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>
                          {villa.bedrooms} bedroom{villa.bedrooms > 1 ? 's' : ''}
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
                  className="mb-6 leading-relaxed font-light opacity-80"
                  style={{ color: COLORS.primary }}
                >
                  {villa.description}
                </p>

                {/* Features */}
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
                        className="flex items-start text-sm font-light opacity-80"
                        style={{ color: COLORS.primary }}
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

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {villa.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="rounded-full border px-3 py-1 text-xs font-light transition-colors"
                      style={{
                        borderColor: COLORS.primary,
                        backgroundColor:
                          selectedVilla?.id === villa.id
                            ? COLORS.primary
                            : 'transparent',
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

      {/* Slide-in Footer Button */}
      {selectedVilla && (
        <div
          className="fixed bottom-0 left-0 w-full py-4 text-center shadow-xl"
          style={{ backgroundColor: COLORS.primary }}
        >
          <button
            type="button"
            onClick={onNext}
            className="px-10 py-3 text-sm tracking-widest uppercase rounded-lg transition-all hover:opacity-90"
            style={{ color: COLORS.light }}
          >
            Continue with {selectedVilla.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default VillaSelection;
