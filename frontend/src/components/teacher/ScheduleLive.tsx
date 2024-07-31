"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { firestore, auth } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";

interface FormData {
  id: string;
  uid: string;
  title: string;
  description: string;
  date: string;
  time: string;
  order: number;
  thumbnail: File | null;
}

interface FormErrors {
  title: string;
  description: string;
  date: string;
  time: string;
  order: string;
  thumbnail: string;
}

export function ScheduleLive() {
  const router = useRouter();
  const [user] = useAuthState(auth); // Get the authenticated user

  const [formData, setFormData] = useState<FormData>({
    id: "",
    uid: "",
    title: "",
    description: "",
    date: "",
    time: "",
    order: 0,
    thumbnail: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    description: "",
    date: "",
    time: "",
    order: "",
    thumbnail: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files, name } = e.target;
    if (name === "thumbnail" && files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setFormErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const errors: FormErrors = {
      title: formData.title ? "" : "Title is required.",
      description: formData.description ? "" : "Description is required.",
      date: formData.date ? "" : "Date is required.",
      time: formData.time ? "" : "Time is required.",
      order: formData.order ? "" : "Order is required.",
      // thumbnail: formData.thumbnail ? "" : "Thumbnail is required.",
    };

    const currentDate = new Date();
    const selectedDate = new Date(formData.date);

    if (
      formData.date &&
      selectedDate.getTime() < currentDate.setHours(0, 0, 0, 0)
    ) {
      errors.date = "Date cannot be in the past.";
    }

    if (
      formData.date &&
      selectedDate.toDateString() === currentDate.toDateString()
    ) {
      const currentTime = currentDate.toTimeString().slice(0, 5);
      if (formData.time && formData.time < currentTime) {
        errors.time = "Time cannot be in the past.";
      }
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", formData);

      const uniqueId = uuidv4();
      const docId = `${formData.title}-${uniqueId}`;
      const newOrder = {
        ...formData,
        id: docId,
        uid: user?.uid || "", // Include the userId
        order: Number(formData.order),
      };

      await setDoc(doc(firestore, "schedule-live", docId), newOrder);
      alert("Class scheduled successfully!");
      router.push("/dashboard-teacher");
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
              name="title"
              placeholder="Learn Figma in 3 hr"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm">{formErrors.title}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="How you will learn to play around with text fonts"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </LabelInputContainer>
        </div>

        <div className="flex flex-row space-x-2 mb-4">
          <LabelInputContainer className="w-1/2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              placeholder="12/12/12"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {formErrors.date && (
              <p className="text-red-500 text-sm">{formErrors.date}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="w-1/2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              placeholder="12:00"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
            {formErrors.time && (
              <p className="text-red-500 text-sm">{formErrors.time}</p>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            name="order"
            placeholder="1"
            type="number"
            value={formData.order.toString()}
            onChange={handleInputChange}
          />
          {formErrors.order && (
            <p className="text-red-500 text-sm">{formErrors.order}</p>
          )} <br />
        </LabelInputContainer>

        {/* <LabelInputContainer>
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {formErrors.thumbnail && (
            <p className="text-red-500 text-sm">{formErrors.thumbnail}</p>
          )}
          {preview && (
            <div className="mt-2">
              <Image src={preview} alt="Thumbnail Preview" width={100} height={100} />
            </div>
          )}
        </LabelInputContainer> */}

        <button
          className="relative py-3 w-full text-sm rounded-md border dark:border-neutral-700 text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 font-medium hover:bg-transparent hover:text-black dark:hover:text-white hover:border-neutral-900 dark:hover:border-neutral-600 transition-all flex justify-center items-center group/btn shadow-button dark:shadow-button-dark"
          type="submit"
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
