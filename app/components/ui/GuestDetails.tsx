import { DAYS, MONTHS } from '@/app/data/Reserve';
import { COLORS } from '@/app/theme/colors';
import { Villa } from '@/app/types/types';
import { ArrowLeft, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';

type FormData = {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
}

type GuestDetailsProps = {
  selectedVilla: Villa|null;
  selectedArrival: Date | null;
  selectedDeparture: Date | null;
  adultCount: number;
  childrenCount: number;
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

const GuestDetails: React.FC<GuestDetailsProps> = ({
  selectedVilla,
  selectedArrival,
  selectedDeparture,
  adultCount,
  childrenCount,
  formData,
  onFormChange,
  onSubmit,
  onBack,
}) => {

  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Form data submitted:", formData);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.prefix} ${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          arrival: formatDate(selectedArrival),
          departure: formatDate(selectedDeparture),
          adults: adultCount,
          children: childrenCount,
          villaName: selectedVilla?.name || '',
          guestInfo: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
      console.log("Email sent successfully");
      
      // Call the parent component's onSubmit handler
      onSubmit(e);
      
    } catch (error) {
      console.error("Error sending email:", error);
      // You might want to show an error message to the user here
      alert("Failed to submit reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div 
          className="rounded-lg p-8 shadow-sm"
          style={{ backgroundColor: COLORS.light, borderColor: COLORS.primary }}
        >
          <h2 
            className="mb-4 text-2xl font-light"
            style={{ color: COLORS.primary }}
          >
            Thank You!
          </h2>
          <p 
            className="mb-6 text-lg font-light"
            style={{ color: COLORS.primary }}
          >
            Your reservation request has been submitted successfully.
          </p>
          <p 
            className="text-sm font-light"
            style={{ color: COLORS.primary, opacity: 0.8 }}
          >
            Our team will contact you shortly at {formData.email} to confirm your reservation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-sm font-light"
          style={{ color: COLORS.primary }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Edit dates
        </button>

        <div className="mb-12">
          <h2
            className="mb-8 text-2xl font-light"
            style={{ color: COLORS.primary }}
          >
            Confirm your stay
          </h2>

          <div
            className="border-opacity-20 mb-8 border-b pb-8"
            style={{ borderColor: COLORS.primary }}
          >
            <h3
              className="mb-4 text-sm font-light tracking-widest uppercase"
              style={{ color: COLORS.primary }}
            >
              Stay Information
            </h3>
            <div className="mb-2 flex items-center">
              <Calendar
                className="mr-2 h-4 w-4 opacity-70"
                style={{ color: COLORS.primary }}
              />
              <span
                className="text-sm font-light"
                style={{ color: COLORS.primary }}
              >
                Arrival: {formatDate(selectedArrival)}
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
                Departure: {formatDate(selectedDeparture)}
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="text-sm font-light"
                style={{ color: COLORS.primary }}
              >
                {adultCount} Adult{adultCount !== 1 ? "s" : ""}, {childrenCount}{" "}
                {childrenCount === 1 ? "Child" : "Children"}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3
                className="mb-4 text-sm font-light tracking-widest uppercase"
                style={{ color: COLORS.primary }}
              >
                Guest Information
              </h3>

              <div className="mb-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <select
                      value={formData.prefix}
                      onChange={(e) =>
                        onFormChange({
                          target: { name: "prefix", value: e.target.value },
                        } as React.ChangeEvent<HTMLSelectElement>)
                      }
                      className="w-full rounded border p-2 text-sm"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                      }}
                    >
                      <option value="">Prefix</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={onFormChange}
                      className="w-full rounded border p-2 text-sm"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                      }}
                      required
                    />
                  </div>
                </div>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={onFormChange}
                  className="w-full rounded border p-2 text-sm"
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                  required
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform">
                      <Mail
                        className="h-4 w-4"
                        style={{ color: COLORS.primary, opacity: 0.7 }}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={onFormChange}
                      className="w-full rounded border p-2 pl-10 text-sm"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                      }}
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform">
                      <Phone
                        className="h-4 w-4"
                        style={{ color: COLORS.primary, opacity: 0.7 }}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={onFormChange}
                      className="w-full rounded border p-2 pl-10 text-sm"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3
                className="mb-4 text-sm font-light tracking-widest uppercase"
                style={{ color: COLORS.primary }}
              >
                Special Requests
              </h3>
              <textarea
                name="specialRequest"
                placeholder="Any special requests or requirements..."
                value={formData.specialRequest}
                onChange={onFormChange}
                className="h-32 w-full rounded border p-2 text-sm"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              />
            </div>

            <div className="mb-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-12 py-4 text-sm tracking-widest uppercase sm:w-auto disabled:opacity-50"
                style={{ backgroundColor: COLORS.primary, color: COLORS.light }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Reservation Request'}
              </button>
            </div>

            <p
              className="text-center text-xs font-light"
              style={{ color: COLORS.primary }}
            >
              Your details will be sent to reserve@ayadacliff.com. Our team will
              contact you shortly to confirm your reservation.
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="sticky top-4 rounded-md bg-white p-6 shadow-sm">
          <h2
            className="mb-6 text-xl font-light"
            style={{ color: COLORS.primary }}
          >
            Stay summary
          </h2>

          <div className="mb-6">
            <h3
              className="mb-6 text-2xl font-light"
              style={{ color: COLORS.primary }}
            >
              {selectedVilla?.name}
            </h3>
            <div className="mb-3 flex items-start">
              <MapPin
                className="mt-0.5 mr-2 h-4 w-4"
                style={{ color: COLORS.primary, opacity: 0.7 }}
              />
              <span
                className="text-sm font-light"
                style={{ color: COLORS.primary }}
              >
                Coastal Road, Clifftop Gardens, Ocean View
              </span>
            </div>
            <p
              className="mb-6 text-sm font-light"
              style={{ color: COLORS.primary, opacity: 0.8 }}
            >
              {selectedVilla?.description}
            </p>
          </div>

          <div
            className="border-opacity-20 mb-6 border-t border-b py-4"
            style={{ borderColor: COLORS.primary }}
          >
            <div className="mb-2">
              <div
                className="text-sm font-light"
                style={{ color: COLORS.primary }}
              >
                <span className="font-medium">Arriving:</span>{" "}
                {formatDate(selectedArrival)}
              </div>
            </div>
            <div className="mb-2">
              <div
                className="text-sm font-light"
                style={{ color: COLORS.primary }}
              >
                <span className="font-medium">Departing:</span>{" "}
                {formatDate(selectedDeparture)}
              </div>
            </div>
            <div>
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

          <div>
            <div className="mb-4">
              <h4
                className="mb-2 text-lg font-light"
                style={{ color: COLORS.primary }}
              >
                {selectedVilla?.name}
              </h4>
              <p
                className="text-sm font-light"
                style={{ color: COLORS.primary, opacity: 0.8 }}
              >
                {selectedVilla?.description}
              </p>
            </div>

            <div
              className="border-opacity-20 mb-4 border-t pt-4"
              style={{ borderColor: COLORS.primary }}
            >
              <p
                className="text-center text-xs font-light"
                style={{ color: COLORS.primary, opacity: 0.7 }}
              >
                Includes taxes & fees
              </p>
            </div>

            {selectedVilla && (
              <img
                src={selectedVilla.image}
                alt={selectedVilla.name}
                className="mb-4 h-48 w-full rounded-md object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;