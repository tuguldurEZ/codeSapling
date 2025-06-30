import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Нэр хамгийн багадаа 2 тэмдэгт байна.",
  }),
  lastName: z.string().min(2, {
    message: "Овог хамгийн багадаа 2 тэмдэгт байна.",
  }),
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна." }),
  phone: z.string().min(8, {
    message: "Дугаар хамгийн багадаа 8 тэмдэгт байна.",
  }),
  employeeRole: z.string().nonempty({ message: "Албан тушаал шаардлагатай." }),
  employeeDate: z.string().min(1, { message: "Огноо сонгоно уу." }),
  role: z.enum(["ADMIN", "USER"], {
    required_error: "Эрх сонгоно уу.",
  }),
});
type FormValues = z.infer<typeof formSchema>;

const Buttons = () => {
  const editHandler = async () => {};
  const deleteHandler = () => {};

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      employeeRole: "",
      employeeDate: "",
      role: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="flex gap-2 ml-7">
      <Dialog>
        <DialogTrigger>
          <Button
            onClick={editHandler}
            className="bg-white border-red-100 border-[1px] text-red-400 font-semibold hover:bg-red-100"
          >
            Засах
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[589px] h-auto flex-col p-8">
          <DialogHeader>
            <DialogTitle className="text-center">
              Ажилтаны мэдээлэл засах
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Нэр ээ оруулна уу..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Овог</FormLabel>
                    <FormControl>
                      <Input placeholder="Овог оо оруулна уу..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Утасний дугаар</FormLabel>
                    <FormControl>
                      <Input placeholder="Дугаараа оруулна уу..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имейл хаяг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Албан тушаал</FormLabel>
                    <FormControl>
                      <Input placeholder="Жишээ: Менежер" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ажилд орсон огноо</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Админ эрх</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Эрх сонгох" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">Админ</SelectItem>
                        <SelectItem value="USER">Ажилтан</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="w-full">
                  asd
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Button
        onClick={deleteHandler}
        className="bg-white text-black border-[1px]  hover:bg-gray-100"
      >
        Устгах
      </Button>
    </div>
  );
};

export default Buttons;
