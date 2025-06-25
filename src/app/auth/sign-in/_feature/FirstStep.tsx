"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendOtpMutation } from "../../../../../generated/client-types";

const formSchema = z.object({
  email: z.string().email("И-мэйл хаяг буруу байна").min(2, {
    message: "И-мэйл хамгийн багадаа 2 тэмдэгт байх ёстой",
  }),
});

const FirstStep = ({
  setStep,
  setEmail,
}: {
  setStep: (_step: number) => void;
  setEmail: (_email: string) => void;
}) => {
  const [sendOtp, { loading }] = useSendOtpMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setEmail(values.email);
    await sendOtp({ variables: { email: values.email } });
    setStep(2);
  }

  return (
    <div className="w-[364px] bg-white flex flex-col justify-between items-center rounded-[10px] shadow-2xl">
      <p className="text-black text-[25px] font-bold my-4">Нэвтрэх</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-5"
        >
          <div className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-2 text-sm">Имэйл хаяг</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email оруулна уу"
                      {...field}
                      className="w-full h-[40px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              type="submit"
              className="w-full h-[40px] px-5 mb-6"
            >
              {loading ? "Уншаж байна..." : " Нэвтрэх"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;
