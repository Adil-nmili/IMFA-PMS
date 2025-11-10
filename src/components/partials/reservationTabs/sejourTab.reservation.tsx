import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import useReservationStore from "@/stores/reservationStore";
import servicesList from '@/constants/services.json'
export const SejourTab: React.FC = () => {

  const { setReservation , reservation} = useReservationStore();


  const form = useForm<ReservationFormValues>({
    defaultValues: 
    reservation ||
    {
      date_entree: "",
      date_sortie: "",
      enfantNum: 0,
      adultsNum: 1,
      services: [
      ],
    },
  });



  useEffect(() => {
    const subscription = form.watch((values) => {
      setReservation(values);
    });

    return () => subscription.unsubscribe();
  }, [form, setReservation]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 h-100 w-full">
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="date_entree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date d'entrée</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_sortie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de sortie</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="enfantNum"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Enfants</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adultsNum"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Adults</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white" />
                  </FormControl>
                  <FormMessage /> 
                </FormItem>
              )}
            />
          </div>
        </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Services</h3>
      <div className="grid grid-cols-2 gap-6">
        {servicesList.map((service) => {
          const isSelected = form.getValues("services")?.some((s: { id: number; }) => s?.id === service?.id);

          return (
            <FormItem key={service.id} className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const currentServices = form.getValues("services") || [];
                    if (checked) {
                      form.setValue("services", [...currentServices, service]);
                    } else {
                      form.setValue(
                        "services",
                        currentServices.filter((s: { id: number; }) => s.id !== service.id)
                      );
                    }
                  }}
                  id={service.type}
                />
              </FormControl>
              <label htmlFor={service.type} className="text-base">
                {service.type}
              </label>
            </FormItem>
          );
        })}
      </div>
    </div>

        
      </form>
    </Form>
  );
};
