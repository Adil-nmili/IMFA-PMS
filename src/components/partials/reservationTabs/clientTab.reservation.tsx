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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserIcon, PhoneIcon, MailIcon, MapPinIcon, IdCardIcon } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState<'personal' | 'contact'>('personal');

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
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
      setCustomSuggestions(Array.isArray(customerResult) ? customerResult : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (customer: any) => {
    form.reset({
      nom: customer.nom || "",
      prenom: customer.prenom || "",
      cin: customer.cin || "",
      genre: customer.genre || "masculin",
      statut_social: customer.statut_social || "celibataire",
      date_naissance: customer.date_naissance || "",
      tel: customer.tel || "",
      email: customer.email || "",
      adresse: customer.adresse || "",
    });
    setCustomSuggestions([]);
  };

  const watchedValues = form.watch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (watchedValues.nom) {
        fetchCustomers(watchedValues.nom);
      } else {
        setCustomSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedValues.nom]);

  useEffect(() => {
    setReservation(watchedValues);
  }, [watchedValues, setReservation]);

  const getInitials = (nom: string, prenom: string) => {
    if (!nom || !prenom) return "?";
    return `${nom.charAt(0)}${prenom.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      celibataire: "bg-blue-100 text-blue-800",
      marie: "bg-green-100 text-green-800",
      divorce: "bg-orange-100 text-orange-800",
      veuf: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getGenderIcon = (gender: string) => {
    return gender === "masculin" ? "👨" : "👩";
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form is automatically handled by react-hook-form
  };

  // Navigation handlers
  const handleNext = () => {
    if (activeSection === 'personal') {
      // Validate personal fields before proceeding
      const personalFields = ['nom', 'prenom', 'cin'];
      const isValid = personalFields.every(field => {
        const value = form.getValues(field as keyof ReservationFormValues);
        return value && value.trim().length > 0;
      });
      
      if (isValid) {
        setActiveSection('contact');
      } else {
        // Mark fields as touched to show errors
        personalFields.forEach(field => {
          form.setValue(field as keyof ReservationFormValues, form.getValues(field as keyof ReservationFormValues) || "", {
            shouldValidate: true,
            shouldTouch: true,
          });
        });
      }
    } else {
      setActiveSection('personal');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-xl p-4 border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-800">Informations Client</h2>
            <p className="text-gray-500 text-xs mt-0.5">Remplissez les informations du client pour la réservation</p>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${form.formState.isValid ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}
          >
            {form.formState.isValid ? "✓ Complet" : "En cours"}
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center max-w-md mx-auto">
        {(['personal', 'contact'] as const).map((step, index) => (
          <React.Fragment key={step}>
            <button
              type="button"
              onClick={() => setActiveSection(step)}
              className={`flex flex-col items-center transition-all ${activeSection === step ? 'text-primary scale-105' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 font-semibold text-sm transition-all ${
                activeSection === step ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-500'
              }`}>
                {step === 'personal' ? '1' : '2'}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">
                {step === 'personal' ? 'Informations Personnelles' : 'Coordonnées'}
              </span>
            </button>
            {index < 1 && (
              <div className={`flex-1 h-0.5 mx-3 transition-colors ${activeSection === 'contact' ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Customer Suggestions */}
          {customSuggestions.length > 0 && (
            <Card className="border-blue-200 bg-blue-50/50 p-2">
              <CardContent className="p-0">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2 p-2">
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
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {customer.nom} {customer.prenom}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                          {customer.cin && (
                            <span className="flex items-center gap-1 truncate">
                              <IdCardIcon className="h-3 w-3 flex-shrink-0" />
                              {customer.cin}
                            </span>
                          )}
                          {customer.tel && (
                            <span className="flex items-center gap-1 truncate">
                              <PhoneIcon className="h-3 w-3 flex-shrink-0" />
                              {customer.tel}
                            </span>
                          )}
                        </div>
                      </div>
                      {customer.statut_social && (
                        <Badge className={`${getStatusColor(customer.statut_social)} whitespace-nowrap`}>
                          {customer.statut_social}
                        </Badge>
                      )}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <Card className={`border-2 ${activeSection === 'personal' ? 'border-primary/30 shadow-lg shadow-primary/10' : 'border-gray-200'} transition-all duration-300`}>
              <CardContent className="p-4 h-[400px] ">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-gray-800">Informations Personnelles</h3>
                    <p className="text-xs text-gray-500">Identité et état civil</p>
                  </div>
                </div>

                <ScrollArea className="h-[300px] pr-3 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Nom <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrez le nom"
                                className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500">
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
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Prénom <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrez le prénom"
                                className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-gray-500">
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
                          <FormLabel className="text-sm font-medium text-gray-700">
                            <IdCardIcon className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                            CIN <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="AA123456"
                              className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-mono text-sm"
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Format: 2 lettres suivies de 6 chiffres
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="statut_social"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Statut social
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 rounded-lg border-gray-300 focus:ring-1 focus:ring-primary/20 text-sm">
                                  <SelectValue placeholder="Choisir un statut" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="celibataire">Célibataire</SelectItem>
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
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Date de naissance
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                              />
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
                          <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                            Genre
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="flex gap-3"
                            >
                              <label
                                htmlFor="masculin"
                                className={`flex items-center gap-2.5 p-3 rounded-lg cursor-pointer transition-all flex-1 ${
                                  field.value === "masculin"
                                    ? "bg-blue-50 border-2 border-blue-500 shadow-sm"
                                    : "bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                                }`}
                              >
                                <RadioGroupItem 
                                  value="masculin" 
                                  id="masculin" 
                                  className="sr-only" 
                                />
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-lg">👨</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">Masculin</div>
                                  <div className="text-xs text-gray-500">Homme</div>
                                </div>
                              </label>
                              <label
                                htmlFor="feminin"
                                className={`flex items-center gap-2.5 p-3 rounded-lg cursor-pointer transition-all flex-1 ${
                                  field.value === "feminin"
                                    ? "bg-pink-50 border-2 border-pink-500 shadow-sm"
                                    : "bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                                }`}
                              >
                                <RadioGroupItem 
                                  value="feminin" 
                                  id="feminin" 
                                  className="sr-only" 
                                />
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-lg">👩</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">Féminin</div>
                                  <div className="text-xs text-gray-500">Femme</div>
                                </div>
                              </label>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className={`border-2 ${activeSection === 'contact' ? 'border-primary/30 shadow-lg shadow-primary/10' : 'border-gray-200'} transition-all duration-300`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-gray-800">Coordonnées</h3>
                    <p className="text-xs text-gray-500">Informations de contact</p>
                  </div>
                </div>

                <ScrollArea className="h-[500px] pr-3">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="tel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            <PhoneIcon className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                            Téléphone <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5 border-r border-gray-200 pr-2.5">
                                <span className="text-base">🇲🇦</span>
                                <span className="text-xs text-gray-500 font-medium">+212</span>
                              </div>
                              <Input
                                {...field}
                                placeholder="6 00 00 00 00"
                                className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all pl-20 text-sm"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
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
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                type="email"
                                {...field}
                                placeholder="exemple@email.com"
                                className="h-10 rounded-lg border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all pl-10 text-sm"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
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
                          <FormLabel className="text-sm font-medium text-gray-700">
                            <MapPinIcon className="h-3.5 w-3.5 inline mr-1.5 text-gray-500" />
                            Adresse
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <textarea
                                {...field}
                                placeholder="Rue, Ville, Code postal"
                                className="min-h-[90px] w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all p-2.5 pl-10 resize-none text-sm"
                                rows={3}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            Pour la livraison des documents
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Customer Preview Card */}
                    {(form.watch("nom") || form.watch("prenom")) && (
                      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-11 w-11 border-2 border-white shadow-sm">
                              <AvatarFallback className="bg-primary text-white text-sm font-semibold">
                                {getInitials(form.watch("nom"), form.watch("prenom"))}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-gray-800 truncate">
                                {form.watch("nom")} {form.watch("prenom")}
                              </div>
                              <div className="text-xs text-gray-600 flex items-center gap-3 mt-1 flex-wrap">
                                {form.watch("cin") && (
                                  <span className="flex items-center gap-1">
                                    <IdCardIcon className="h-3 w-3 flex-shrink-0" />
                                    {form.watch("cin")}
                                  </span>
                                )}
                                {form.watch("tel") && (
                                  <span className="flex items-center gap-1">
                                    <PhoneIcon className="h-3 w-3 flex-shrink-0" />
                                    {form.watch("tel")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5 flex-shrink-0">
                              {form.watch("genre") && (
                                <Badge variant="outline" className="bg-white text-xs whitespace-nowrap">
                                  {getGenderIcon(form.watch("genre"))} {form.watch("genre")}
                                </Badge>
                              )}
                              {form.watch("statut_social") && (
                                <Badge className={`${getStatusColor(form.watch("statut_social"))} text-xs whitespace-nowrap`}>
                                  {form.watch("statut_social")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Form Status Footer */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
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
                    onClick={handleNext}
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