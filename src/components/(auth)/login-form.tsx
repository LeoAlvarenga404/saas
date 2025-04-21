import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { LoginFormData, loginSchema } from "@/schemas/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth-context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    if (loading) return;
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch {
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <form
      className={cn("space-y-6", className)}
      {...props}
      onSubmit={handleSubmit(handleLogin)}
    >
      {errors.root && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className={cn(
                "pl-10",
                errors.email &&
                  "border-destructive focus-visible:ring-destructive/20"
              )}
              {...register("email")}
              disabled={loading}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={visible ? "text" : "password"}
              className={cn(
                "pl-10",
                errors.password &&
                  "border-destructive focus-visible:ring-destructive/20"
              )}
              placeholder="••••••••"
              {...register("password")}
              disabled={loading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-9 w-9 px-0"
              onClick={() => setVisible((prev) => !prev)}
              tabIndex={-1}
            >
              {visible ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {visible ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {errors.password && (
            <p className="text-destructive text-sm font-medium">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full font-medium">
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
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          New to the platform?{" "}
          <Link to="#" className="text-primary font-medium hover:underline">
            Contact your administrator
          </Link>
        </span>
      </div>
    </form>
  );
}
