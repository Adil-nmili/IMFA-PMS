import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, UserIcon, PhoneIcon, MailIcon, MapPinIcon, IdCardIcon } from "lucide-react";
import useAppState from "@/stores/authStore";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/schema/reservationSchema";
import { getCustomers } from "@/api/reservationApi";

export const ClientTab: React.FC = () => {
  const setReservation = useAppState((state) => state.setReservation);
  const [customSuggestions, setCustomSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema) as any,
    defaultValues: {
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

  const fetchCustomers = async (query: string) => {
    if (query.length < 2) {
      setCustomSuggestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const customerResult = await getCustomers(query);
      setCustomSuggestions(customerResult || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (customer: any) => {
    form.reset({
      nom: customer.nom,
      prenom: customer.prenom,
      cin: customer.cin,
      genre: customer.genre,
      statut_social: customer.statut_social,
      date_naissance: customer.date_naissance,
      tel: customer.tel,
      email: customer.email,
      adresse: customer.adresse,
    });
    setCustomSuggestions([]);
  };

  const watchedValues = form.watch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (watchedValues.nom) {
        fetchCustomers(watchedValues.nom);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedValues.nom]);

  useEffect(() => {
    setReservation(watchedValues);
  }, [watchedValues]);

  const getInitials = (nom: string, prenom: string) => {
    return `${nom.charAt(0)}${prenom.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (status: string) => {
    const colors = {
      celibataire: "bg-blue-100 text-blue-800",
      marie: "bg-green-100 text-green-800",
      divorce: "bg-orange-100 text-orange-800",
      veuf: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getGenderIcon = (gender: string) => {
    return gender === "masculin" ? "👨" : "👩";
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-2 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-primary/10 rounded-xl">
            <UserIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Informations Client</h2>
            <p className="text-gray-600 text-xs mt-1">Remplissez les informations du client pour la réservation</p>
          </div>
          <Badge variant="outline" className="ml-auto bg-white text-xs">
            {form.formState.isValid ? "✓ Formulaire valide" : "En cours"}
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {['personal', 'contact'].map((step, index) => (
          <React.Fragment key={step}>
            <button
              onClick={() => setActiveSection(step)}
              className={`flex flex-col items-center ${activeSection === step ? 'text-primary' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                activeSection === step ? 'bg-primary text-white' : 'bg-gray-100'
              }`}>
                {step === 'personal' ? '1' : '2'}
              </div>
              <span className="text-xs font-medium">
                {step === 'personal' ? 'Informations Personnelles' : 'Coordonnées'}
              </span>
            </button>
            {index < 1 && <div className="flex-1 h-0.5 bg-gray-200 mx-4" />}
          </React.Fragment>
        ))}
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Customer Suggestions */}
          {customSuggestions.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/50 p-2">
              <CardContent className="p-0">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Clients similaires trouvés
                </h3>
                <div className="space-y-2">
                  {customSuggestions.map((customer, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(customer)}
                      className="w-full text-left p-3 rounded-lg bg-white hover:bg-blue-50 transition-colors border border-blue-100 flex items-center gap-3"
                    >
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                          {getInitials(customer.nom, customer.prenom)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{customer.nom} {customer.prenom}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <IdCardIcon className="h-3 w-3" />
                            {customer.cin}
                          </span>
                          <span className="flex items-center gap-1">
                            <PhoneIcon className="h-3 w-3" />
                            {customer.tel}
                          </span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(customer.statut_social)}>
                        {customer.statut_social}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information Card */}
            <Card className={`border-2 p-2 ${activeSection === 'personal' ? 'border-primary/30' : 'border-gray-200'}`}>
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">Informations Personnelles</h3>
                    <p className="text-xs text-gray-600">Identité et état civil</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                            Nom <span className="text-red-500 text-sm">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrez le nom"
                              className="py-1 rounded-xl border-gray-300 focus:border-primary focus:ring-primary/20 transition-all placeholder:text-xs"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Saisissez le nom de famille
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                            Prénom <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrez le prénom"
                              className="py-1 rounded-xl border-gray-300 focus:border-primary focus:ring-primary/20 transition-all placeholder:text-xs"
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Saisissez le prénom
                          </FormDescription>
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
                        <FormLabel className="flex items-center gap-2">
                          <IdCardIcon className="h-4 w-4 text-gray-500" />
                          CIN <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="AA123456"
                            className="py-1 rounded-xl border-gray-300 focus:border-primary focus:ring-primary/20 transition-all font-mono placeholder:text-xs"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Format: 2 lettres suivies de 6 chiffres
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="statut_social"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-gray-500" />
                            Statut social
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="h-12 rounded-xl border-gray-300 focus:ring-primary/20">
                              <SelectValue placeholder="Choisir un statut" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="celibataire" className="flex items-center gap-2">
                                <span>Célibataire</span>
                                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">Jeune</Badge>
                              </SelectItem>
                              <SelectItem value="marie">Marié</SelectItem>
                              <SelectItem value="divorce">Divorcé</SelectItem>
                              <SelectItem value="veuf">Veuf</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date_naissance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            Date de naissance
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                type="date"
                                {...field}
                                className="py-2 rounded-xl border-gray-300 focus:border-primary text-xs focus:ring-primary/20 transition-all pl-10 placeholder:text-xs"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-gray-500" />
                          Genre
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-6 bg-gray-50 p-2 rounded-xl"
                          >
                            <label
                              htmlFor="masculin"
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all flex-1 ${
                                field.value === "masculin"
                                  ? "bg-white border-2 border-primary shadow-sm"
                                  : "bg-transparent border border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <RadioGroupItem value="masculin" id="masculin" className="sr-only" />
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xl">👨</span>
                              </div>
                              <div>
                                <div className="font-medium text-sm">Masculin</div>
                                <div className="text-xs text-gray-600">Homme</div>
                              </div>
                            </label>
                            <label
                              htmlFor="feminin"
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all flex-1 ${
                                field.value === "feminin"
                                  ? "bg-white border-2 border-primary shadow-sm"
                                  : "bg-transparent border border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <RadioGroupItem value="feminin" id="feminin" className="sr-only" />
                              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <span className="text-xl">👩</span>
                              </div>
                              <div>
                                <div className="font-medium text-sm">Féminin</div>
                                <div className="text-sm text-gray-600">Femme</div>
                              </div>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className={`border-2 ${activeSection === 'contact' ? 'border-primary/30' : 'border-gray-200'}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Coordonnées</h3>
                    <p className="text-sm text-gray-600">Informations de contact</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="tel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-gray-500" />
                          Téléphone <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                              <span className="text-gray-500">🇲🇦</span>
                              <span className="text-gray-400">+212</span>
                            </div>
                            <Input
                              {...field}
                              placeholder="6 00 00 00 00"
                              className="h-12 rounded-xl border-gray-300 focus:border-primary focus:ring-primary/20 transition-all pl-24"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Format marocain: 06 XX XX XX XX
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MailIcon className="h-4 w-4 text-gray-500" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="email"
                              {...field}
                              placeholder="exemple@email.com"
                              className="h-12 rounded-xl border-gray-300 focus:border-primary focus:ring-primary/20 transition-all pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nous enverrons la confirmation à cette adresse
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4 text-gray-500" />
                          Adresse
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                              {...field}
                              placeholder="Rue, Ville, Code postal"
                              className="min-h-[100px] w-full rounded-xl border border-gray-300 focus:border-primary focus:ring-primary/20 transition-all p-3 pl-10 resize-none"
                              rows={3}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Pour la livraison des documents
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Customer Preview Card */}
                  {(form.watch("nom") || form.watch("prenom")) && (
                    <Card className="mt-6 border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-primary text-white">
                              {getInitials(form.watch("nom"), form.watch("prenom"))}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">
                              {form.watch("nom")} {form.watch("prenom")}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                              {form.watch("cin") && (
                                <span className="flex items-center gap-1">
                                  <IdCardIcon className="h-3 w-3" />
                                  {form.watch("cin")}
                                </span>
                              )}
                              {form.watch("tel") && (
                                <span className="flex items-center gap-1">
                                  <PhoneIcon className="h-3 w-3" />
                                  {form.watch("tel")}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {form.watch("genre") && (
                              <Badge variant="outline" className="bg-white">
                                {getGenderIcon(form.watch("genre"))} {form.watch("genre")}
                              </Badge>
                            )}
                            {form.watch("statut_social") && (
                              <Badge className={getStatusColor(form.watch("statut_social"))}>
                                {form.watch("statut_social")}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Status Footer */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${form.formState.isValid ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="text-sm text-gray-600">
                    {form.formState.isValid 
                      ? "Tous les champs requis sont remplis" 
                      : "Veuillez remplir tous les champs obligatoires (*)"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 px-6 rounded-xl border-gray-300 hover:bg-gray-50"
                    onClick={() => form.reset()}
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveSection(activeSection === 'personal' ? 'contact' : 'personal')}
                    className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {activeSection === 'personal' ? (
                      <>
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        Continuer vers Coordonnées
                      </>
                    ) : (
                      <>
                        <UserIcon className="h-4 w-4 mr-2" />
                        Revenir aux Informations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};