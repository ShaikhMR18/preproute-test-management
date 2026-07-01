import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { STORAGE_KEYS } from "../constants";
import Input from "../components/r-Input/Input";
import Button from "../components/r-Buttton/Button";
import { loginSchema, type LoginFormData } from "./Schema";
import { loginApi } from "../api/auth.api";
import type { AxiosError } from "axios";
import { Logo, TestTubeMan } from "../assets";
import { showError, showSuccess } from "../utils/toast";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginApi(data);

      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

      localStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(response.data.user),
      );
      showSuccess("Login successful");

      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      showError(axiosError.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbff]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-5">
        <div className="hidden lg:flex lg:col-span-2 items-center justify-center px-12">
          <TestTubeMan width={467} height={344} />
        </div>

        <div className="col-span-1 lg:col-span-3 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-[600px] rounded-xl border-[0.5px] border-[#60A5FA] bg-white px-12 py-22 shadow-sm">
            <Logo width={100} height={40} />

            <h1 className="mt-6 text-2xl font-semibold text-[#2F3747]">
              Login
            </h1>

            <p className="mt-2 mb-8 text-sm text-[#6B7280]">
              Use your company provided Login credentials
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="User ID"
                placeholder="Enter User ID"
                {...register("userId")}
                error={errors.userId?.message}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter Password"
                {...register("password")}
                error={errors.password?.message}
              />

              <Link
                to="#"
                className="block text-sm text-[#7489FF] hover:underline"
              >
                Forgot password?
              </Link>

              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
