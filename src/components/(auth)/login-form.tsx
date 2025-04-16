import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { LoginFormData, loginSchema } from "@/schemas/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth-context";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [visible, setVisible] = useState<boolean>(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setFormError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
      setLoading(false);
    }
  };


  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your business account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className=" flex items-center">
            <div className="w-full flex-col">
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={visible ? "text" : "password"}
                  required
                  {...register("password")}
                  className=""
                />
                <button
                  onClick={() => setVisible(!visible)}
                  type="button"
                  className="absolute right-2 cursor-pointer"
                >
                  {visible ? (
                    <EyeClosed className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
