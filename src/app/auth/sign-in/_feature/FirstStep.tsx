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
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("И-мэйл хаяг буруу байна").min(2, {
    message: "И-мэйл хамгийн багадаа 2 тэмдэгт байх ёстой",
  }),
});

const FirstStep = ({ setStep }: { setStep: (_step: number) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(2);
  }

  return (
    <div className="w-[364px] h-[364px] bg-white flex flex-col justify-between items-center rounded-[10px] shadow-2xl">
      <p className="text-black text-xl font-bold mt-6">Нэвтрэх</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full px-5"
        >
          <div className=" space-y-6">
            <Image src={"versel.svg"} width={100} height={100} alt="123" />
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
            <Button type="submit" className="w-full h-[40px] px-5 mb-6">
              Нэвтрэх
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;
