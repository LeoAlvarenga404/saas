import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, LockKeyhole, KeyRound } from "lucide-react";
import api from "@/services/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const forgotPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [stage, setStage] = useState<"email" | "code" | "reset">("email");
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleSendCode = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!email || !email.includes("@")) {
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      if (res.status === 200) {
        setStage("code");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value.length === 6 && stage === "code") {
      verifyCode();
    }
  }, [value]);

  const verifyCode = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-code", {
        code: value,
        email,
      });
      if (res.status === 200) {
        setStage("reset");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      await api.post("/auth/reset-password", {
        email,
        newPassword: data.password,
        code: value,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(resetPassword)}
      className={cn("space-y-6", className)}
      {...props}
    >
      {stage === "email" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              We'll send a verification code to this email address
            </p>
          </div>

          <Button
            type="button"
            onClick={handleSendCode}
            disabled={loading}
            className="w-full font-medium"
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Code...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      )}

      {stage === "code" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              Verification Code
            </Label>
            <div className="flex items-center justify-center">
              <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Code sent to {email}
              </span>
            </div>
            <InputOTP
              maxLength={6}
              value={value}
              onChange={setValue}
              disabled={loading}
              containerClassName="mt-2 justify-center"
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-10 h-12 text-xl font-medium rounded-md border-border"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStage("email")}
              disabled={loading}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSendCode}
              disabled={loading}
            >
              {loading ? "Resending..." : "Resend code"}
            </Button>
          </div>
        </div>
      )}

      {stage === "reset" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              New Password
            </Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className={cn(
                  "pl-10",
                  errors.password &&
                    "border-destructive focus-visible:ring-destructive/20"
                )}
                placeholder="••••••••"
                {...register("password")}
                disabled={loading}
              />
            </div>
            {errors.password && (
              <p className="text-destructive text-sm font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                className={cn(
                  "pl-10",
                  errors.confirmPassword &&
                    "border-destructive focus-visible:ring-destructive/20"
                )}
                placeholder="••••••••"
                {...register("confirmPassword")}
                disabled={loading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-medium"
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
