import { DAYS, MONTHS } from "@/app/data/Reserve";
import { COLORS } from "@/app/theme/colors";
import { Villa } from "@/app/types/types";
import { Check, Calendar } from "lucide-react";
import React from "react";

type FormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
};

type ConfirmationCardProps = {
  selectedVilla: Villa | null;
  selectedArrival: Date | null;
  selectedDeparture: Date | null;
  adultCount: number;
  childrenCount: number;
  formData: FormData;
  onReset: () => void;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  selectedVilla,
  selectedArrival,
  selectedDeparture,
  adultCount,
  childrenCount,
  formData,
  onReset,
}) => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 text-center">
      <div className="mb-6 flex justify-center">
        <div
          className="bg-opacity-20 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Check className="h-8 w-8" style={{ color: COLORS.primary }} />
        </div>
      </div>

      <h2
        className="mb-4 text-2xl font-light"
        style={{ color: COLORS.primary }}
      >
        Reservation Request Submitted
      </h2>

      <p
        className="mb-8 text-base font-light"
        style={{ color: COLORS.primary }}
      >
        Thank you for your reservation request. Your details have been sent to
        our reservations team at{" "}
        <span className="font-medium">reservations@ayadacliff.com</span>. We will
        contact you shortly to confirm your stay.
      </p>

      <div className="mb-8 rounded-md bg-white p-6 text-left shadow-sm">
        <h3
          className="mb-4 text-lg font-light"
          style={{ color: COLORS.primary }}
        >
          Reservation Summary
        </h3>

        <div className="mb-4">
          <div className="mb-2 flex items-center">
            <Calendar
              className="mr-2 h-4 w-4 opacity-70"
              style={{ color: COLORS.primary }}
            />
            <span
              className="text-sm font-light"
              style={{ color: COLORS.primary }}
            >
              <span className="font-medium">Arrival:</span>{" "}
              {formatDate(selectedArrival)}
            </span>
          </div>
          <div className="mb-2 flex items-center">
            <Calendar
              className="mr-2 h-4 w-4 opacity-70"
              style={{ color: COLORS.primary }}
            />
            <span
              className="text-sm font-light"
              style={{ color: COLORS.primary }}
            >
              <span className="font-medium">Departure:</span>{" "}
              {formatDate(selectedDeparture)}
            </span>
          </div>
          <div className="flex items-center">
            <div
              className="text-sm font-light"
              style={{ color: COLORS.primary }}
            >
              <span className="font-medium">Guests:</span> {adultCount} Adult
              {adultCount !== 1 ? "s" : ""}, {childrenCount}{" "}
              {childrenCount === 1 ? "Child" : "Children"}
            </div>
          </div>
        </div>

        <div
          className="border-opacity-20 border-t pt-4"
          style={{ borderColor: COLORS.primary }}
        >
          <div
            className="mb-1 text-sm font-light"
            style={{ color: COLORS.primary }}
          >
            <span className="font-medium">Villa:</span>{" "}
            {selectedVilla?.name ?? ""}
          </div>
          <div
            className="mb-1 text-sm font-light"
            style={{ color: COLORS.primary }}
          >
            <span className="font-medium">Guest:</span> {formData.prefix}{" "}
            {formData.firstName} {formData.lastName}
          </div>
          <div
            className="mb-1 text-sm font-light"
            style={{ color: COLORS.primary }}
          >
            <span className="font-medium">Email:</span> {formData.email}
          </div>
          <div className="text-sm font-light" style={{ color: COLORS.primary }}>
            <span className="font-medium">Phone:</span> {formData.phone}
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="border px-8 py-3 text-sm tracking-widest uppercase transition-all hover:opacity-90"
        style={{
          borderColor: COLORS.primary,
          color: COLORS.primary,
          backgroundColor: "transparent",
        }}
      >
        Make Another Reservation
      </button>
    </div>
  );
};

export default ConfirmationCard;
