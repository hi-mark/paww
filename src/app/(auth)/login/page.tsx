"use client";

import { PrimaryButton } from "@/components/Buttons/Buttons";
import LabelledInput from "@/components/Form/InputField";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface FormData {
  userName: string;
  emailId: string;
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    emailId: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({});
  };

  /**
   * note 1:
   * these type of simple validations
   * can be handled by HTML itself(required,type)
   * example :  https://www.koharmunish.com/contact
   *
   * but I am adding JS validation just to showcase simple form validation using java script
   *
   * note 2:
   * current validation behaviour checks for error only on submitting form(and clears error on handle Change),
   * behaviour can be modified to validate particular field onchange/onblur etc
   */
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.userName) newErrors.userName = "User Name is required";

    if (!formData.emailId) newErrors.emailId = "Email ID is required";
    else if (!formData.emailId.includes("@"))
      newErrors.emailId = "Please enter a valid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.userName,
            email: formData.emailId,
          }),
        }
      );

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Login failed! Invalid response");
      }
    } catch (err) {
      console.error("Login error:", err);
      window.alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSubmit}>
        <LabelledInput
          value={formData.userName}
          label="User Name"
          name="userName"
          placeholder="John Doe"
          onChange={handleChange}
          error={errors.userName}
        />
        <LabelledInput
          value={formData.emailId}
          label="Email ID"
          name="emailId"
          type="email"
          onChange={handleChange}
          placeholder="john@abc.com"
          error={errors.emailId}
        />
        <PrimaryButton fullWidth large type="submit">
          {isSubmitting ? "Logging in..." : "Log in"}
        </PrimaryButton>
      </form>
    </>
  );
};

export default Page;
