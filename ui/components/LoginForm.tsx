"use client";
import { IError } from "@/interface/error.interface";
import { ILoginResponse } from "@/interface/login.interface";
import axiosInstance from "@/lib/axios.instance";
import { loginCredentialSchema } from "@/validation-schema/login.user.schema";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ILoginForm {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values: ILoginForm) => {
      return await axiosInstance.post("/user/login", values);
    },
    onSuccess: (res: ILoginResponse) => {
      const accessToken = res.data.accessToken;
      const firstName = res.data.userDetails.firstName;
      const role = res.data.userDetails.role;

      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("firstName", firstName);
      window.localStorage.setItem("role", role);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <Box className="flex flex-col">
      {isPending && <LinearProgress color="warning" />}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginCredentialSchema}
        onSubmit={(values: ILoginForm) => {
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 shadow-2xl rounded p-4 min-w-[400px] justify-center items-center"
            >
              <Typography variant="h5" className="text-gray-600">
                Login
              </Typography>

              <FormControl fullWidth>
                <TextField label="Email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText className="text-base" error>
                    {formik.errors.email}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText className="text-base" error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Stack className="w-full justify-center items-center gap-2">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  disabled={isPending}
                >
                  submit
                </Button>

                <Link
                  className="text-orange-400 hover:text-orange-600"
                  href="/register"
                >
                  New here? Create Account
                </Link>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default LoginForm;
