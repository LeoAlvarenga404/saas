import { LoginForm } from "@/components/(auth)/login-form";

export function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center relative overflow-hidden">
      <img
        src="/src/assets/background.jpg"
        alt="Background"
        className="object-cover w-full h-full absolute top-0 left-0 z-[-2]"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-950/40 z-[-1]"></div>
      <div className="w-full max-w-md p-6 m-4 sm:p-8 md:p-12 border border-accent rounded-lg bg-zinc-950/70 backdrop-blur-xs shadow-lg z-10">
        <LoginForm />
      </div>
    </div>
  );
}
