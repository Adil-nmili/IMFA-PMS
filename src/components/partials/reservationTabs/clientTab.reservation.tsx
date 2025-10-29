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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAppState from "@/stores/authStore";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/schema/reservationSchema";
import { getCustomers } from "@/api/authapi";

export const ClientTab: React.FC = () => {
  
  const setReservation = useAppState((state) => state.setReservation);
  
  const [customSuggestions,setCustomSuggestions] = useState<any|null>([]);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema)as any,
    defaultValues: 
    {
      nom: "",
      prenom: "",
      cin: "",
      genre: "masculin",
      statut_social: "celibataire",
      date_naissance: "",
      tel: "",
      email: "",
      adresse: "",
    },
  });

  const fetchCustomers = async (e:any ) => {
    const customerResult = await getCustomers(e.target.value);
  };

  const watchedValues = form.watch();

  React.useEffect(() => {
    fetchCustomers(watchedValues.nom);
    setReservation(watchedValues);
  }, [watchedValues]);

  return (
      <Form {...form} >
        <form className="grid grid-cols-1  md:grid-cols-2 gap-8 w-ful h-100">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field}
                    placeholder="Entrez le nom" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Entrez le prénom" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIN <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="AA123456" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statut_social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut social</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="!h-12 text-base rounded-xl bg-white w-full">
                        <SelectValue placeholder="Choisir un statut"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celibataire">Célibataire</SelectItem>
                        <SelectItem value="marie">Marié</SelectItem>
                        <SelectItem value="divorce">Divorcé</SelectItem>
                        <SelectItem value="veuf">Veuf</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-4 bg-white py-2 px-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="masculin" id="masculin" className="border border-[#3F3124]"/>
                        <label htmlFor="masculin">Masculin</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="feminin" id="feminin" className="border border-[#3F3124]"/>
                        <label htmlFor="feminin">Féminin</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="date_naissance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+212 6 00 00 00 00" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="exemple@email.com" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Rue, Ville, Code postal" {...field} className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" className="bg-[#958E85] w-50 h-12 text-white rounded ">Retour</Button>
              <Button type="submit" className="bg-[#3F3124] text-white rounded  w-50 h-12">Continuer</Button>
            </div> */}
          </div>
        </form>
      </Form>
  );
};
