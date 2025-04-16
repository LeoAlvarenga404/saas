import { Container } from "@/components/container";
import { LoginForm } from "@/components/(auth)/login-form";

export function SignIn() {
  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 sm:p-8 md:p-12 border border-accent rounded-lg">
        <LoginForm />
      </div>
    </Container>
  );
}
