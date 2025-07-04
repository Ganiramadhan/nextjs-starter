"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "@/services/authApi";
import { toast } from "react-toastify";
import { registerSchema } from "@/schemas/authSchema";

export default function SignUpPage() {
  const { t } = useTranslation("common");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      const firstError = result.error.errors[0];
      const translatedMsg = t(firstError?.message);
      toast.error(translatedMsg);
      return;
    }

    try {
      const response = await register(result.data).unwrap();
      toast.success(response.message || t("signup.success"));
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data
      ) {
        toast.error(t(String(err.data.message)));
      } else {
        toast.error(t("signup.failed"));
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-sky-50 to-sky-100 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          {t("signup.title")}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label={t("signup.name")}
            name="name"
            placeholder={t("signup.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label={t("signup.email")}
            name="email"
            type="email"
            placeholder={t("signup.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={t("signup.password")}
            name="password"
            type="password"
            placeholder={t("signup.passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? t("signup.loading") : t("signup.button")}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          {t("signup.hasAccount")}{" "}
          <Link
            href="/auth/sign-in"
            className="text-blue-600 font-medium hover:underline"
          >
            {t("signup.signin")}
          </Link>
        </p>
      </div>
    </main>
  );
}
