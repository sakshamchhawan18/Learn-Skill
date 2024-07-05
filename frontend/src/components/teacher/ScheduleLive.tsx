"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn"; // Utility for combining class names
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ScheduleLive() {

  const router = useRouter();
  
  const handleClick = () => {
      
    };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    thumbnail: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    thumbnail: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === "uploadthumbnail" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Validate form data
  const validateForm = () => {
    const errors = {
      title: formData.title ? "" : "Title is required.",
      description: formData.description ? "" : "Description is required.",
      date: formData.date ? "" : "Date is required.",
      time: formData.time ? "" : "Time is required.",
      thumbnail: formData.thumbnail ? "" : "Thumbnail is required.",
    };

    // Get the current date and time
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);

    // Validate date - must not be in the past
    if (formData.date && selectedDate.getTime() < currentDate.setHours(0, 0, 0, 0)) {
      errors.date = "Date cannot be in the past.";
    }

    // Validate time if the selected date is today
    if (
      formData.date &&
      selectedDate.toDateString() === currentDate.toDateString()
    ) {
      const currentTime = currentDate.toTimeString().slice(0, 5); // Get current time in HH:MM format
      if (formData.time && formData.time < currentTime) {
        errors.time = "Time cannot be in the past.";
      }
    }

    setFormErrors(errors);

    // Check if any errors exist
    return !Object.values(errors).some((error) => error);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);
      router.push('/dashboard');
      
      // Prepare FormData for file upload
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("date", formData.date);
      formDataToSubmit.append("time", formData.time);
      if (formData.thumbnail) {
        formDataToSubmit.append("thumbnail", formData.thumbnail);
      }

      // Perform file upload (adjust URL and logic as needed)
      fetch("/api/upload", {
        method: "POST",
        body: formDataToSubmit,
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Schedule Live Class
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mb-4">
          <LabelInputContainer>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Learn Figma in 3 hr"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
            {formErrors.title && <p className="text-red-500 text-sm">{formErrors.title}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="How you will learn to play around with text fonts"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
            />
            {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          </LabelInputContainer>
        </div>

        <div className="flex flex-row space-x-2 mb-4">
          <LabelInputContainer className="w-1/2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              placeholder="12/12/12"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {formErrors.date && <p className="text-red-500 text-sm">{formErrors.date}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="w-1/2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              placeholder="10:10"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
            {formErrors.time && <p className="text-red-500 text-sm">{formErrors.time}</p>}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="uploadthumbnail">Your thumbnail</Label>
          <input
            id="uploadthumbnail"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="border p-2 rounded-md dark:bg-zinc-800 dark:text-white"
          />
          {formErrors.thumbnail && <p className="text-red-500 text-sm">{formErrors.thumbnail}</p>}
          {preview && (
            <div className="mt-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Preview:</p>
              <Image
                src={preview}
                height={100}
                width={100}
                alt="Thumbnail Preview"
                className="w-100 h-100 object-cover rounded-md"
              />
            </div>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit" onClick={handleClick}
        >
          Schedule &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
