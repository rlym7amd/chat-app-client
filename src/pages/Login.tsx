import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email Address is required")
    .email("Not a valid Email Address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must contian 8 characters"),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_DOMAIN}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      setError("root", {
        type: "validate",
        message: error.message,
      });
      return;
    }

    navigate("/");
  };
  return (
    <form className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="h-3 mb-3">
        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}
      </div>
      <div
        className={`border-2 ${
          errors.email ? "border-red-600" : "border-transparent"
        } bg-[#D9D9D9] rounded-lg px-2 py-1`}
      >
        <label htmlFor="email" className="block text-[#636363] text-xs">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="bg-inherit border-none outline-none w-full"
          {...register("email")}
        />
      </div>
      <p className="h-3 m-0 text-xs text-red-600 mt-1">
        {errors.email ? errors.email.message : ""}
      </p>
      <div
        className={`border-2 ${
          errors.email ? "border-red-600" : "border-transparent"
        } bg-[#D9D9D9] rounded-lg px-2 py-1 mt-2`}
      >
        <label htmlFor="password" className="block text-[#636363] text-xs">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="bg-inherit border-none outline-none w-full"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
          })}
        />
      </div>
      <p className="h-3 m-0 text-xs text-red-600 mt-1">
        {errors.password ? errors.password.message : ""}
      </p>
      <button className="bg-[#1A88A7] hover:bg-[#459cb4] transition-colors text-white font-semibold w-full rounded-lg py-2 mt-2 cursor-pointer">
        Login
      </button>
      <div className="text-xs text-end mt-2">
        <span>You don&apos;t have an account? </span>
        <Link
          to="/register"
          className="underline hover:text-[#1A88A7] transition-colors"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
