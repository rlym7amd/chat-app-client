import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

const registerFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email Address is required")
    .email("Not a valid Email Address"),
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must contian 8 characters"),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
  });
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      const { firstName, lastName, ...rest } = data;
      const newData = {
        name: `${firstName} ${lastName}`,
        ...rest,
      };
      await registerUser(newData);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError("root", {
          type: "validate",
          message: err.message,
        });
      }
    }
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
      <div className="flex gap-2 mt-2">
        <div
          className={`border-2 ${
            errors.firstName ? "border-red-600" : "border-transparent"
          } bg-[#D9D9D9] rounded-lg px-2 py-1 flex-1`}
        >
          <label htmlFor="firstName" className="block text-[#636363] text-xs">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="bg-inherit border-none outline-none w-full"
            {...register("firstName")}
          />
        </div>
        <div
          className={`border-2 ${
            errors.lastName ? "border-red-600" : "border-transparent"
          } bg-[#D9D9D9] rounded-lg px-2 py-1 flex-1`}
        >
          <label htmlFor="lastName" className="block text-[#636363] text-xs">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="bg-inherit border-none outline-none w-full"
            {...register("lastName")}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-1 h-3">
        {errors.firstName && (
          <p className="text-xs text-red-600 flex-1">
            {errors.firstName.message}
          </p>
        )}
        {errors.lastName && (
          <p className="text-xs text-red-600 flex-1">
            {errors.lastName.message}
          </p>
        )}
      </div>
      <div
        className={`border-2 ${
          errors.password ? "border-red-600" : "border-transparent"
        } bg-[#D9D9D9] rounded-lg px-2 py-1 mt-2`}
      >
        <label htmlFor="password" className="block text-[#636363] text-xs">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="bg-inherit border-none outline-none w-full"
          {...register("password")}
        />
      </div>
      <p className="h-3 text-xs text-red-600 mt-1">
        {errors.password ? errors.password.message : ""}
      </p>
      <button
        type="submit"
        className="bg-[#1A88A7] hover:bg-[#459cb4] transition-colors text-white font-semibold w-full rounded-lg py-2 mt-2 cursor-pointer"
      >
        {isLoading ? "Loading.." : "Create an account"}
      </button>
      <div className="text-xs text-end mt-2">
        <span>Already have an account? </span>
        <Link
          to="/login"
          className="underline hover:text-[#1A88A7] transition-colors"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
