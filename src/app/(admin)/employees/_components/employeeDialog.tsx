"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useCreateEmployeeMutation } from "../../../../../generated/client-types";
import { Plus } from "lucide-react";

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

export default function EmployeeDialog({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [createEmployee, { loading }] = useCreateEmployeeMutation({
    onCompleted: () => {
      toast.success("Амжилттай нэвтэрлээ!");
      onCreated();
      setOpen(false);
      form.reset();
    },
  });
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
    await createEmployee({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: Number(values.phone),
          email: values.email,
          employeeRole: values.employeeRole,
          employedDate: values.employeeDate,
          role: values.role,
        },
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-300 to-orange-500 hover:from-beige-500 hover:to-orange-600 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[589px] h-auto flex-col p-8">
        <DialogHeader>
          <DialogTitle className="text-center">
            Шинэ ажилтан бүртгэх
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Бүртгэж байна..." : "Бүртгэх"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
