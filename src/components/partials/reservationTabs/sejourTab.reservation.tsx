import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAppState from "@/stores/authStore";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";

export const SejourTab: React.FC = () => {

  const setReservation = useAppState(state=>state.setReservation);

  const form = useForm<ReservationFormValues>({
    defaultValues: {
      date_entree: "",
      date_sortie: "",
      enfantNum: 0,
      adultsNum: 1,
      services: [
      ],
    },
  });

  const servicesList = [
    { key: "wifi", label: "Wi-Fi" },
    { key: "petit_dej", label: "Petit-déjeuner" },
    { key: "parking", label: "Parking" },
    { key: "Restauration", label: "Restauration" },
    { key: "Pressing", label: "Pressing" },
    { key: "Bien-être", label: "Bien-être" },
    { key: "Service en chambre", label: "Service en chambre" },
    { key: "Navette aéroport", label: "Navette aéroport" },
    { key: "Piscine", label: "Piscine" },
    { key: "Transport", label: "Transport" },
    { key: "Baby-sitting", label: "Baby-sitting" },
    { key: "Salle de sport", label: "Salle de sport" },
    { key: "Parking privé", label: "Parking privé" },
  ];

  const watchedValues = form.watch();

  useEffect(()=>{
    setReservation(watchedValues);
  },[watchedValues,setReservation])

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
          {servicesList.map((service) => (
            <FormField
              key={service.key}
              control={form.control}
              name={`services.${service.key}`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox 
                    checked={field.value} onCheckedChange={field.onChange} id={service.key} />
                  </FormControl>
                  <label htmlFor={service.key} className="text-base">{service.label}</label>
                </FormItem>
              )}
            />
          ))}

          </div>
        </div>
        
      </form>
    </Form>
  );
};
