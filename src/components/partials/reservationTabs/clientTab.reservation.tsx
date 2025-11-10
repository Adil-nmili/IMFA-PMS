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
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/schema/reservationSchema";
import useReservationStore from "@/stores/reservationStore";
import { getClientByContaining } from "@/api/usersApi";

export const ClientTab: React.FC = () => {
  
  const { setReservation , reservation } = useReservationStore();

  const [customSuggestionsClients,setCustomSuggestionsClients] = useState<any|null>([]);
  const customSuggClientscomp = useRef<HTMLUListElement | null>(null);
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema)as any,
    defaultValues: 
    reservation ||
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

  const email = form.watch("email");

  const fetchCustomers = async () => {
    try {
      const { nom, prenom, email } = form.getValues();

      const response = await getClientByContaining(email);

      if ((nom && nom.trim() !== "") || (prenom && prenom.trim() !== "") || (email && email.trim() !== "")) {
        const filtered = response?.filter((client) => 
          (nom && client.nom.toLowerCase().includes(nom.toLowerCase())) ||
          (prenom && client.prenom.toLowerCase().includes(prenom.toLowerCase())) ||
          (email && client.email.toLowerCase().includes(email.toLowerCase()))
        );
        setCustomSuggestionsClients(filtered);
      } else {
        setCustomSuggestionsClients([]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const subscription = form.watch((values) => {
      setReservation(values);
    });

    return () => subscription.unsubscribe();
  }, [form, setReservation]);

  useEffect(() => {
    fetchCustomers();
  }, [email]);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        customSuggClientscomp.current &&
        !customSuggClientscomp.current.contains(event.target as Node)
      ) {
        setCustomSuggestionsClients([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <Form {...form} >
        <form className="grid grid-cols-1  md:grid-cols-2 gap-8 w-ful h-100">
          <div className="flex flex-col gap-4">
            <div className="relative">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field}
                        placeholder="Entrez le nom" className="!py-4 text-base rounded-xl h-12 border-gray-300 focus:ring-2 focus:ring-primary bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="relative">
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
            </div>
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
            <div className="relative">
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
      {customSuggestionsClients?.length > 0 && (
        <ul
          className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto"
          ref={customSuggClientscomp}
        >
          {customSuggestionsClients.map((client: any, index: number) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
              form.reset({
                nom: client.nom,
                prenom: client.prenom,
                email: client.email,
                idClient: client.id,
                tel: client.telephone,
                cin: client.CIN,
                adresse: client.adresse,
                date_naissance: client.date_naissance,
                genre: client.genre,
                statut_social: client.statut_social,
              });

                setCustomSuggestionsClients([]);
              }}
            >
              {client.nom} {client.prenom} - {client.email}
            </li>
          ))}
        </ul>
      )}
            </div>
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
