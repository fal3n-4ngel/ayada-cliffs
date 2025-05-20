"use client";

import React, { useState, useMemo } from "react";
import type { JSX } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Check,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Header from "@/app/components/Header";
import { motion } from "framer-motion";
import { COLORS } from "@/app/theme/colors";
import { DAYS, MONTHS } from "@/app/data/Reserve";

interface FormData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequest: string;
}

const ReservationsPage: React.FC = () => {
  const today = new Date();

  const [selectedView, setSelectedView] = useState<"calendar" | "details">(
    "calendar",
  );
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [nextMonth, setNextMonth] = useState((today.getMonth() + 1) % 12);
  const [nextMonthYear, setNextMonthYear] = useState(
    today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear(),
  );

  const [selectedArrival, setSelectedArrival] = useState<Date | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<Date | null>(null);
  const [adultCount, setAdultCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequest: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper functions
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      setNextMonth(0);
      setNextMonthYear(currentYear);
    } else {
      setCurrentMonth(currentMonth - 1);
      setNextMonth(currentMonth);
      setNextMonthYear(currentYear);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      setNextMonth(1);
      setNextMonthYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
      setNextMonth((currentMonth + 2) % 12);
      setNextMonthYear(currentMonth + 2 > 11 ? currentYear + 1 : currentYear);
    }
  };

  const handleDateSelect = (day: number, month: number, year: number): void => {
    const selectedDate = new Date(year, month, day);

    if (!selectedArrival || (selectedArrival && selectedDeparture)) {
      // Start new selection
      setSelectedArrival(selectedDate);
      setSelectedDeparture(null);
    } else {
      // We have arrival but no departure
      if (selectedDate < selectedArrival) {
        // If selected date is before arrival, make it the new arrival
        setSelectedArrival(selectedDate);
      } else {
        // Otherwise, it's the departure
        setSelectedDeparture(selectedDate);
      }
    }
  };

  const isDateSelected = (
    day: number,
    month: number,
    year: number,
  ): boolean => {
    if (!selectedArrival) return false;

    const date = new Date(year, month, day);

    if (selectedArrival && selectedDeparture) {
      return date >= selectedArrival && date <= selectedDeparture;
    }

    return date.getTime() === selectedArrival.getTime();
  };

  const isDateArrival = (day: number, month: number, year: number): boolean => {
    if (!selectedArrival) return false;
    const date = new Date(year, month, day);
    return date.getTime() === selectedArrival.getTime();
  };

  const isDateDeparture = (
    day: number,
    month: number,
    year: number,
  ): boolean => {
    if (!selectedDeparture) return false;
    const date = new Date(year, month, day);
    return date.getTime() === selectedDeparture.getTime();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // In a real application, we'd send the data to the server
    setIsSubmitted(true);

    // In a real scenario, you would send an email to reserve@ayadacliff.com with the form data
    console.log("Reservation data to be emailed to reserve@ayadacliff.com:", {
      arrival: formatDate(selectedArrival),
      departure: formatDate(selectedDeparture),
      adults: adultCount,
      children: childrenCount,
      guestInfo: formData,
    });
  };

  const renderCalendar = (month: number, year: number): JSX.Element => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days: JSX.Element[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="p-2"></td>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day, month, year);
      const isArrival = isDateArrival(day, month, year);
      const isDeparture = isDateDeparture(day, month, year);

      days.push(
        <td
          key={day}
          className={`cursor-pointer p-2 text-center ${isSelected ? "bg-opacity-20" : "hover:bg-opacity-10"}`}
          onClick={() => handleDateSelect(day, month, year)}
          style={{
            backgroundColor: isSelected ? COLORS.primary : "",
            opacity: isSelected ? 0.2 : 1,
          }}
        >
          <div
            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${isArrival || isDeparture ? "" : ""}`}
            style={{
              backgroundColor:
                isArrival || isDeparture ? COLORS.primary : "transparent",
              color:
                isArrival || isDeparture
                  ? COLORS.light
                  : isSelected
                    ? COLORS.primary
                    : COLORS.dark,
            }}
          >
            {day}
          </div>
        </td>,
      );
    }

    // Arrange days into rows (weeks)
    const rows: JSX.Element[] = [];
    let cells: JSX.Element[] = [];

    days.forEach((cell, index) => {
      if (index % 7 === 0 && index > 0) {
        rows.push(<tr key={`row-${index}`}>{cells}</tr>);
        cells = [];
      }
      cells.push(cell);
    });

    // Add the remaining cells
    if (cells.length > 0) {
      // Fill in any remaining cells in the last row
      while (cells.length < 7) {
        cells.push(<td key={`empty-end-${cells.length}`} className="p-2"></td>);
      }
      rows.push(<tr key="row-last">{cells}</tr>);
    }

    return (
      <div>
        <div className="mb-4 text-center">
          <h3
            className="font-light tracking-wider uppercase"
            style={{ color: COLORS.primary }}
          >
            {MONTHS[month]} {year}
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th
                  key={day}
                  className="p-2 font-light"
                  style={{ color: COLORS.primary }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  // Memoize the calendar renderings
  const currentMonthCalendar = useMemo(
    () => renderCalendar(currentMonth, currentYear),
    [currentMonth, currentYear, selectedArrival, selectedDeparture],
  );

  const nextMonthCalendar = useMemo(
    () => renderCalendar(nextMonth, nextMonthYear),
    [nextMonth, nextMonthYear, selectedArrival, selectedDeparture],
  );

  const resetForm = (): void => {
    setIsSubmitted(false);
    setSelectedView("calendar");
    setSelectedArrival(null);
    setSelectedDeparture(null);
    setFormData({
      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequest: "",
    });
  };

  // Memoize this value to avoid recalculation
  const canCheckAvailability = useMemo(
    () => selectedArrival !== null && selectedDeparture !== null,
    [selectedArrival, selectedDeparture],
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  return (
    <div
      className="page-content hide-scrollbar flex min-h-screen flex-col items-center justify-center overflow-x-hidden"
      style={{ backgroundColor: COLORS.secondary, color: COLORS.dark }}
    >
      <Header
        scrollY={4000}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="container mx-auto px-6 py-12">
        {!isSubmitted ? (
          <>
            {selectedView === "calendar" && (
              <div>
                <div className="mb-8 text-center">
                  <h2
                    className="mb-2 text-2xl font-light"
                    style={{ color: COLORS.primary }}
                  >
                    Select your dates
                  </h2>
                  {selectedArrival && (
                    <div className="text-sm" style={{ color: COLORS.primary }}>
                      {selectedDeparture ? (
                        <span>
                          {formatDate(selectedArrival)} -{" "}
                          {formatDate(selectedDeparture)}
                        </span>
                      ) : (
                        <span>
                          {formatDate(selectedArrival)} - Please select
                          departure date
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-8 flex items-center justify-center">
                  <Button
                    onClick={handlePrevMonth}
                    variant="ghost"
                    size="icon"
                    style={{ color: COLORS.primary }}
                    aria-label="Previous month"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <div className="mx-4 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="bg-white p-6 shadow-sm">
                      {currentMonthCalendar}
                    </div>
                    <div className="bg-white p-6 shadow-sm">
                      {nextMonthCalendar}
                    </div>
                  </div>

                  <Button
                    onClick={handleNextMonth}
                    variant="ghost"
                    size="icon"
                    style={{ color: COLORS.primary }}
                    aria-label="Next month"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mx-auto mb-8 grid w-full max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label
                      className="mb-2 block text-xs font-light tracking-widest uppercase"
                      style={{ color: COLORS.primary }}
                      htmlFor="adults"
                    >
                      Adults
                    </Label>
                    <Select
                      value={adultCount.toString()}
                      onValueChange={(value) => setAdultCount(parseInt(value))}
                    >
                      <SelectTrigger
                        className="w-full border"
                        style={{
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                        }}
                      >
                        <SelectValue
                          placeholder={`${adultCount} Adult${adultCount !== 1 ? "s" : ""}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Adult{num !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      className="mb-2 block text-xs font-light tracking-widest uppercase"
                      style={{ color: COLORS.primary }}
                      htmlFor="children"
                    >
                      Children
                    </Label>
                    <Select
                      value={childrenCount.toString()}
                      onValueChange={(value) =>
                        setChildrenCount(parseInt(value))
                      }
                    >
                      <SelectTrigger
                        className="w-full border"
                        style={{
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                        }}
                      >
                        <SelectValue
                          placeholder={`${childrenCount} ${childrenCount === 1 ? "Child" : "Children"}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Child" : "Children"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => {
                      if (canCheckAvailability) {
                        setSelectedView("details");
                      }
                    }}
                    disabled={!canCheckAvailability}
                    className="px-10 py-6 tracking-widest uppercase"
                    style={{
                      backgroundColor: COLORS.primary,
                      color: COLORS.light,
                      opacity: canCheckAvailability ? 1 : 0.5,
                    }}
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
            )}

            {selectedView === "details" && (
              <div className="grid grid-cols-1 gap-12 p-15 md:grid-cols-2">
                <div>
                  <Button
                    onClick={() => setSelectedView("calendar")}
                    variant="ghost"
                    className="mb-6 flex items-center text-sm font-light"
                    style={{ color: COLORS.primary }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Edit dates
                  </Button>

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
                          className="font-light"
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
                          className="font-light"
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
                          {adultCount} Adult{adultCount !== 1 ? "s" : ""},{" "}
                          {childrenCount}{" "}
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
                              <Select
                                value={formData.prefix}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    prefix: value,
                                  }))
                                }
                              >
                                <SelectTrigger
                                  className="w-full border"
                                  style={{
                                    borderColor: COLORS.primary,
                                    color: COLORS.primary,
                                  }}
                                >
                                  <SelectValue placeholder="Prefix" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Mr">Mr</SelectItem>
                                  <SelectItem value="Mrs">Mrs</SelectItem>
                                  <SelectItem value="Ms">Ms</SelectItem>
                                  <SelectItem value="Dr">Dr</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="col-span-2">
                              <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleFormChange}
                                className="w-full border"
                                style={{
                                  borderColor: COLORS.primary,
                                  color: COLORS.primary,
                                }}
                                required
                              />
                            </div>
                          </div>

                          <Input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleFormChange}
                            className="w-full border"
                            style={{
                              borderColor: COLORS.primary,
                              color: COLORS.primary,
                            }}
                            required
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform">
                                <Mail
                                  className="h-4 w-4"
                                  style={{
                                    color: COLORS.primary,
                                    opacity: 0.7,
                                  }}
                                />
                              </div>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleFormChange}
                                className="w-full border pl-10"
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
                                  style={{
                                    color: COLORS.primary,
                                    opacity: 0.7,
                                  }}
                                />
                              </div>
                              <Input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleFormChange}
                                className="w-full border pl-10"
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
                        <Textarea
                          name="specialRequest"
                          placeholder="Any special requests or requirements..."
                          value={formData.specialRequest}
                          onChange={handleFormChange}
                          className="h-32 w-full border"
                          style={{
                            borderColor: COLORS.primary,
                            color: COLORS.primary,
                          }}
                        />
                      </div>

                      <div className="mb-8 text-center">
                        <Button
                          type="submit"
                          className="w-full px-12 py-6 tracking-widest uppercase md:w-auto"
                          style={{
                            backgroundColor: COLORS.primary,
                            color: COLORS.light,
                          }}
                        >
                          Submit Reservation Request
                        </Button>
                      </div>

                      <p
                        className="text-center text-xs font-light"
                        style={{ color: COLORS.primary }}
                      >
                        Your details will be sent to reserve@ayadacliff.com. Our
                        team will contact you shortly to confirm your
                        reservation.
                      </p>
                    </form>
                  </div>
                </div>

                <div>
                  <div className="sticky top-4 bg-white p-6 shadow-sm">
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
                        Ayada Cliffs
                      </h3>
                      <div className="mb-3 flex items-start">
                        <MapPin
                          className="mt-0.5 mr-2 h-4 w-4"
                          style={{ color: COLORS.primary, opacity: 0.7 }}
                        />
                        <span
                          className="font-light"
                          style={{ color: COLORS.primary }}
                        >
                          Coastal Road, Clifftop Gardens, Ocean View
                        </span>
                      </div>
                      <p
                        className="mb-6 text-sm font-light"
                        style={{ color: COLORS.primary, opacity: 0.8 }}
                      >
                        Perched on dramatic coastal cliffs, Ayada Cliffs offers
                        breathtaking panoramic views of the Arabian Sea, with
                        private villas nestled amongst lush tropical gardens.
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
                          <span className="font-medium">Guests:</span>{" "}
                          {adultCount} Adult{adultCount !== 1 ? "s" : ""},{" "}
                          {childrenCount}{" "}
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
                          Ocean View Villa
                        </h4>
                        <p
                          className="text-sm font-light"
                          style={{ color: COLORS.primary, opacity: 0.8 }}
                        >
                          A luxurious retreat with private infinity pool and
                          panoramic ocean views, designed with local materials
                          and contemporary aesthetics.
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
                          Rates starting from
                        </p>
                        <p
                          className="text-center text-2xl font-light"
                          style={{ color: COLORS.primary }}
                        >
                          $850 <span className="text-sm">per night</span>
                        </p>
                        <p
                          className="text-center text-xs font-light"
                          style={{ color: COLORS.primary, opacity: 0.7 }}
                        >
                          Includes taxes & fees
                        </p>
                      </div>

                      <img
                        src="/api/placeholder/800/400"
                        alt="Ocean View Villa"
                        className="mb-4 h-48 w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto max-w-xl py-12 text-center">
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

            <p className="mb-8 font-light" style={{ color: COLORS.primary }}>
              Thank you for your reservation request. Your details have been
              sent to our reservations team at{" "}
              <span className="font-medium">reserve@ayadacliff.com</span>. We
              will contact you shortly to confirm your stay.
            </p>

            <div className="mb-8 bg-white p-6 text-left shadow-sm">
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
                    <span className="font-medium">Guests:</span> {adultCount}{" "}
                    Adult{adultCount !== 1 ? "s" : ""}, {childrenCount}{" "}
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
                  <span className="font-medium">Name:</span> {formData.prefix}{" "}
                  {formData.firstName} {formData.lastName}
                </div>
                <div
                  className="mb-1 text-sm font-light"
                  style={{ color: COLORS.primary }}
                >
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
                <div
                  className="mb-1 text-sm font-light"
                  style={{ color: COLORS.primary }}
                >
                  <span className="font-medium">Phone:</span> {formData.phone}
                </div>
                <div
                  className="text-sm font-light"
                  style={{ color: COLORS.primary }}
                >
                  <span className="font-medium">Special Requests:</span>{" "}
                  {formData.specialRequest || "None"}
                </div>
              </div>
            </div>
            <Button
              onClick={resetForm}
              className="px-10 py-6 tracking-widest uppercase"
              style={{ backgroundColor: COLORS.primary, color: COLORS.light }}
            >
              Make Another Reservation
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};
export default ReservationsPage;
