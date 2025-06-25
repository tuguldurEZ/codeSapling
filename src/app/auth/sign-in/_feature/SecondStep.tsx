"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";
import { useVerifyOtpMutation } from "../../../../../generated/client-types";
import { useRouter } from "next/navigation";
import { useEmployee } from "@/app/_context/employeeContext";

const FormSchema = z.object({
  pin: z.string().length(4, {
    message: "4 оронтой OTP код оруулна уу.",
  }),
});

const SecondStep = ({ email }: { email: string }) => {
  const { login } = useEmployee();
  const router = useRouter();
  const [verifyOtp, { loading }] = useVerifyOtpMutation();
  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await verifyOtp({
        variables: {
          email,
          otp: parseInt(data.pin),
        },
      });

      const token = response?.data?.verifyOtp?.token;

      const role = response?.data?.verifyOtp?.role;
      if (token && role) {
        localStorage.setItem("token", token);
        await login(token);

        toast.success("Амжилттай нэвтэрлээ!");

        if (role === "ADMIN") {
          router.push("/employee-dashboard");
        } else {
          router.push("/employee-dashboard");
        }
      } else {
        toast.error("OTP баталгаажуулалт амжилтгүй боллоо.");
      }
    } catch (error) {
      console.log(error);
      toast.error("TP код буруу байна");
      form.setError("pin", {
        message: "OTP код буруу байна",
      });
    }
  };

  return (
    <div className="w-[364px] h-[364px] bg-white flex flex-col justify-between items-center rounded-[10px] shadow-2xl">
      <p className="text-black text-xl font-bold mt-6">Нэвтрэх</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-5"
        >
          <div className="m-auto space-y-6">
            <Image src={"versel.svg"} width={100} height={100} alt="123" />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="w-full mx-auto">
                  <FormLabel className="mb-2 text-sm">
                    Имэйлээ шалгаад код оо оруулна уу.
                  </FormLabel>
                  <FormControl className="w-full">
                    <InputOTP
                      maxLength={4}
                      {...field}
                      value={value}
                      className="w-full mx-auto flex justify-center"
                      onChange={(value) => {
                        setValue(value);
                        field.onChange(value);
                      }}
                    >
                      <InputOTPGroup className="mx-auto w-full flex justify-center">
                        {[0, 1, 2, 3].map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="w-11 h-11"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-[40px] px-5 mb-6"
              disabled={loading}
            >
              {loading ? "Шалгаж байна..." : "Нэвтрэх"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;
