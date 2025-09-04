import React, { useState, useEffect } from "react";
import { post } from "../../api/api";

const CreateEventModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    eventName: "",
    eventDescription: "",
    eventStartDate: "",
    eventEndDate: "",
    eventRegClosingDate: "",
    eventTime: "",
    eventTermsAndCondition: "",
    eventMiscDetails: "",
  });

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await post("/getCountryList");
        if (res.meta?.status) {
          setCountryList(res.data.countryList);
        }
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStateList([]);
      setSelectedState("");
      setCityList([]);
      setSelectedCity("");
      return;
    }

    const fetchStates = async () => {
      try {
        const res = await post("/getStateList", {
          countryCode: selectedCountry,
        });
        if (res.meta?.status) {
          setStateList(res.data.stateList);
          setSelectedState("");
          setCityList([]);
          setSelectedCity("");
        }
      } catch (err) {
        console.error("Failed to load states:", err);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) {
      setCityList([]);
      setSelectedCity("");
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await post("/getCityList", { stateId: selectedState });
        if (res.meta?.status) {
          setCityList(res.data.cityList);
          setSelectedCity("");
        }
      } catch (err) {
        console.error("Failed to load cities:", err);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    Object.values(form).every((val) => val.trim()) &&
    selectedCountry &&
    selectedState &&
    selectedCity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please fill all required fields including location.");
      return;
    }

    setCreating(true);
    setError(null);

    const payload = {
      ...form,
      eventStartDate: form.eventStartDate.split("T")[0],
      eventEndDate: form.eventEndDate.split("T")[0],
      eventRegClosingDate: form.eventRegClosingDate.split("T")[0],
      eventTime: form.eventTime.split("T")[1]?.slice(0, 5) || form.eventTime,
      countryCode: selectedCountry,
      stateId: Number(selectedState),
      cityId: Number(selectedCity),
    };

    try {
      const response = await post("/createEvent", payload);
      if (response.meta?.status) {
        refresh();
        onClose();
      } else {
        setError(response.meta?.message || "Failed to create event.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setCreating(false);
    }
  };

  // Filter helpers for searchable dropdowns
  const filterItems = (list, searchTerm, key) =>
    list.filter((item) =>
      item[key].toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Clean, single-cell dropdown design
  const renderDropdown = (
    label,
    search,
    setSearch,
    selectedValue,
    setSelectedValue,
    list,
    keyId,
    keyName,
    disabled,
    showDropdown,
    setShowDropdown
  ) => {
    const filteredList = filterItems(list, search, keyName);
    const selectedItem = list.find((item) => item[keyId] === selectedValue);
    const displayValue = selectedItem ? selectedItem[keyName] : search;

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={displayValue}
            onChange={(e) => {
              setSearch(e.target.value);
              if (selectedValue) {
                setSelectedValue("");
              }
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => {
              // Delay to allow clicking on dropdown items
              setTimeout(() => setShowDropdown(false), 200);
            }}
            disabled={disabled}
            placeholder={`Select ${label.toLowerCase()}...`}
            className={`w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent ${
              disabled
                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                : "bg-white"
            }`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {showDropdown && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredList.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No {label.toLowerCase()} found
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item[keyId]}
                  className={`px-3 py-2 cursor-pointer text-sm hover:bg-pink-50 ${
                    selectedValue === item[keyId]
                      ? "bg-orange-100 text-[#FF0808] font-medium"
                      : "text-gray-700"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    setSelectedValue(item[keyId]);
                    setSearch("");
                    setShowDropdown(false);
                  }}
                >
                  {item[keyName]}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create Event</h2>
          <p className="text-sm text-gray-600 mt-1">
            Plan your event with ease. Fill in the details below to create a
            unique and memorable experience for your attendees.
          </p>
        </div>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name & Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              name="eventName"
              type="text"
              value={form.eventName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="eventDescription"
              value={form.eventDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["eventStartDate", "eventEndDate", "eventRegClosingDate"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "eventStartDate"
                      ? "Event Start Date"
                      : field === "eventEndDate"
                      ? "Event End Date"
                      : "Registration Closing Date"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={field}
                    type="date"
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
                    required
                  />
                </div>
              )
            )}
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Time <span className="text-red-500">*</span>
            </label>
            <input
              name="eventTime"
              type="time"
              value={form.eventTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
              required
            />
          </div>

          {/* Location Dropdowns */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              Event Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {renderDropdown(
                "Country",
                countrySearch,
                setCountrySearch,
                selectedCountry,
                setSelectedCountry,
                countryList,
                "countryCode",
                "countryName",
                false,
                showCountryDropdown,
                setShowCountryDropdown
              )}

              {renderDropdown(
                "State",
                stateSearch,
                setStateSearch,
                selectedState,
                setSelectedState,
                stateList,
                "stateId",
                "stateName",
                !selectedCountry,
                showStateDropdown,
                setShowStateDropdown
              )}

              {renderDropdown(
                "City",
                citySearch,
                setCitySearch,
                selectedCity,
                setSelectedCity,
                cityList,
                "cityId",
                "cityName",
                !selectedState,
                showCityDropdown,
                setShowCityDropdown
              )}
            </div>
          </div>

          {/* Terms & Misc */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Terms & Conditions <span className="text-red-500">*</span>
              </label>
              <textarea
                name="eventTermsAndCondition"
                value={form.eventTermsAndCondition}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Miscellaneous Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="eventMiscDetails"
                value={form.eventMiscDetails}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-[#FF0808] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 italic">
            All fields marked with an asterisk (*) are required and cannot be
            left blank.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              disabled={creating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                isFormValid && !creating
                  ? "bg-[#FF0808] hover:shadow-md"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isFormValid || creating}
            >
              {creating ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
