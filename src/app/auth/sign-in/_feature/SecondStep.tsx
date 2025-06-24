"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
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

const FormSchema = z.object({
  pin: z.string().min(3, {
    message: "Your one-time password must be 3 characters.",
  }),
});

const SecondStep = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const [value, setValue] = useState("");
  console.log(value)
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
                      onChange={(value) => setValue(value)}
                      
                    >
                      <InputOTPGroup className="mx-auto w-full flex justify-center">
                        <InputOTPSlot index={0} className="w-11 h-11" />
                        <InputOTPSlot index={1} className="w-11 h-11" />
                        <InputOTPSlot index={2} className="w-11 h-11" />
                        <InputOTPSlot index={3} className="w-11 h-11" />
                      </InputOTPGroup>
                    </InputOTP>
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

export default SecondStep;
