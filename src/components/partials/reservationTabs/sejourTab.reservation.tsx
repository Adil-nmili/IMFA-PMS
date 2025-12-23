import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAppState from "@/stores/authStore";
import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import { cn } from "@/lib/utils";

export const SejourTab: React.FC = () => {
  const setReservation = useAppState(state => state.setReservation);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [nightsCount, setNightsCount] = useState<number>(0);

  const form = useForm<ReservationFormValues>({
    defaultValues: {
      date_entree: "",
      date_sortie: "",
      enfantNum: 0,
      adultsNum: 1,
      services: [],
    },
  });

  const servicesList = [
    { key: "wifi", label: "Wi-Fi", icon: "📶", category: "Confort", popular: true },
    { key: "petit_dej", label: "Petit-déjeuner", icon: "☕", category: "Nourriture", popular: true },
    { key: "parking", label: "Parking", icon: "🚗", category: "Transport", popular: false },
    { key: "Restauration", label: "Restauration", icon: "🍽️", category: "Nourriture", popular: true },
    { key: "Pressing", label: "Pressing", icon: "👔", category: "Service", popular: false },
    { key: "Bien-être", label: "Bien-être", icon: "💆", category: "Spa", popular: true },
    { key: "Service en chambre", label: "Service en chambre", icon: "🛎️", category: "Service", popular: false },
    { key: "Navette aéroport", label: "Navette aéroport", icon: "✈️", category: "Transport", popular: false },
    { key: "Piscine", label: "Piscine", icon: "🏊", category: "Loisirs", popular: true },
    { key: "Transport", label: "Transport", icon: "🚌", category: "Transport", popular: false },
    { key: "Baby-sitting", label: "Baby-sitting", icon: "👶", category: "Famille", popular: false },
    { key: "Salle de sport", label: "Salle de sport", icon: "💪", category: "Sport", popular: false },
    { key: "Parking privé", label: "Parking privé", icon: "🅿️", category: "Transport", popular: false },
  ];

  const watchedValues = form.watch();

  useEffect(() => {
    setReservation(watchedValues);
    
    // Calculate nights count
    if (watchedValues.date_entree && watchedValues.date_sortie) {
      const start = new Date(watchedValues.date_entree);
      const end = new Date(watchedValues.date_sortie);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNightsCount(diffDays > 0 ? diffDays : 0);
    } else {
      setNightsCount(0);
    }
  }, [watchedValues, setReservation]);

  const handleDateSelect = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
    if (range.from) {
      form.setValue("date_entree", format(range.from, "yyyy-MM-dd"));
    }
    if (range.to) {
      form.setValue("date_sortie", format(range.to, "yyyy-MM-dd"));
    }
  };

  const handleGuestChange = (type: 'adult' | 'child', operation: 'increment' | 'decrement') => {
    const currentAdults = form.getValues("adultsNum") || 1;
    const currentChildren = form.getValues("enfantNum") || 0;

    if (type === 'adult') {
      const newValue = operation === 'increment' ? currentAdults + 1 : Math.max(1, currentAdults - 1);
      form.setValue("adultsNum", newValue);
    } else {
      const newValue = operation === 'increment' ? currentChildren + 1 : Math.max(0, currentChildren - 1);
      form.setValue("enfantNum", newValue);
    }
  };

  const getServiceCategories = () => {
    const categories = [...new Set(servicesList.map(service => service.category))];
    return categories;
  };

  const getServicesByCategory = (category: string) => {
    return servicesList.filter(service => service.category === category);
  };

  const selectedServicesCount = servicesList.filter(
    service => form.watch(`services.${service.key}`)
  ).length;

  return (
    <div className="space-y-8 p-0">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-xl">
            <CalendarIcon className="h-8 w-8 text-amber-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Planning du Séjour</h2>
            <p className="text-gray-600 mt-1">Définissez les dates et services pour votre réservation</p>
          </div>
          {nightsCount > 0 && (
            <Badge className="ml-auto bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-100">
              {nightsCount} nuit{nightsCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Dates & Guests */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Calendar className="h-5 w-5 text-primary" />
                  Dates et Occupation
                </CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Date Range Picker */}
                <div>
                  <FormLabel className="text-base font-medium mb-3 block">
                    Période du séjour
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-14 text-left justify-start font-normal rounded-xl border-gray-300",
                          !dateRange.from && !dateRange.to && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "PPP", { locale: fr })} -{" "}
                              {format(dateRange.to, "PPP", { locale: fr })}
                            </>
                          ) : (
                            format(dateRange.from, "PPP", { locale: fr })
                          )
                        ) : (
                          "Sélectionner les dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={handleDateSelect}
                        numberOfMonths={2}
                        locale={fr}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {/* Manual Date Inputs */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="date_entree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Date d'arrivée</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                type="date"
                                {...field}
                                className="h-12 pl-10 rounded-lg border-gray-300 focus:border-primary"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date_sortie"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Date de départ</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                type="date"
                                {...field}
                                className="h-12 pl-10 rounded-lg border-gray-300 focus:border-primary"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Guest Counter */}
                <div>
                  <FormLabel className="text-base font-medium mb-3 block">
                    Nombre de personnes
                  </FormLabel>
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium">Adultes</div>
                        <div className="text-sm text-gray-600">Âge 13+</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={() => handleGuestChange('adult', 'decrement')}
                          disabled={form.watch("adultsNum") <= 1}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-semibold text-lg">
                          {form.watch("adultsNum")}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={() => handleGuestChange('adult', 'increment')}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium">Enfants</div>
                        <div className="text-sm text-gray-600">Âge 0-12</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={() => handleGuestChange('child', 'decrement')}
                          disabled={form.watch("enfantNum") <= 0}
                        >
                          <span className="text-lg">-</span>
                        </Button>
                        <span className="w-8 text-center font-semibold text-lg">
                          {form.watch("enfantNum")}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={() => handleGuestChange('child', 'increment')}
                        >
                          <span className="text-lg">+</span>
                        </Button>
                      </div>
                    </div>

                    {/* Total Guests Summary */}
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-blue-800">Total occupants</div>
                        <div className="text-lg font-bold text-blue-800">
                          {(form.watch("adultsNum") || 0) + (form.watch("enfantNum") || 0)} personnes
                        </div>
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        {form.watch("adultsNum")} adulte(s) + {form.watch("enfantNum")} enfant(s)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Services */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <span className="text-2xl">✨</span>
                    Services Optionnels
                  </CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {selectedServicesCount} sélectionné{selectedServicesCount !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <FormDescription className="mt-2">
                  Personnalisez votre séjour avec nos services supplémentaires
                </FormDescription>
                <Separator />
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Popular Services Section */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800 border-red-200">Populaire</Badge>
                      Services les plus demandés
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {servicesList.filter(s => s.popular).map((service) => (
                        <FormField
                          key={service.key}
                          control={form.control}
                          name={`services.${service.key}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className={cn(
                                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50",
                                  field.value
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 bg-white"
                                )}>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id={service.key}
                                    className="h-5 w-5 data-[state=checked]:bg-primary"
                                  />
                                  <div className="flex items-center gap-3 flex-1">
                                    <span className="text-2xl">{service.icon}</span>
                                    <div>
                                      <label
                                        htmlFor={service.key}
                                        className="font-medium cursor-pointer"
                                      >
                                        {service.label}
                                      </label>
                                      <div className="text-xs text-gray-500">{service.category}</div>
                                    </div>
                                  </div>
                                  {field.value && (
                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                      ✓
                                    </Badge>
                                  )}
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* All Services by Category */}
                  <div className="space-y-4">
                    {getServiceCategories().filter(cat => !servicesList.filter(s => s.category === cat).every(s => s.popular)).map((category) => (
                      <div key={category}>
                        <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {getServicesByCategory(category).filter(s => !s.popular).map((service) => (
                            <FormField
                              key={service.key}
                              control={form.control}
                              name={`services.${service.key}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className={cn(
                                      "flex items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer hover:border-gray-300",
                                      field.value
                                        ? "border-primary/30 bg-primary/5"
                                        : "border-gray-200 bg-white"
                                    )}>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        id={service.key}
                                        className="h-4 w-4 data-[state=checked]:bg-primary"
                                      />
                                      <div className="flex items-center gap-2 flex-1">
                                        <span className="text-xl">{service.icon}</span>
                                        <label
                                          htmlFor={service.key}
                                          className="text-sm cursor-pointer"
                                        >
                                          {service.label}
                                        </label>
                                      </div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Dates du séjour</div>
                  <div className="font-semibold">
                    {watchedValues.date_entree ? (
                      <>
                        {format(new Date(watchedValues.date_entree), "dd MMM yyyy", { locale: fr })} -{" "}
                        {watchedValues.date_sortie ? format(new Date(watchedValues.date_sortie), "dd MMM yyyy", { locale: fr }) : "..."}
                      </>
                    ) : (
                      "À définir"
                    )}
                  </div>
                  {nightsCount > 0 && (
                    <div className="text-sm text-primary font-medium">
                      {nightsCount} nuit{nightsCount > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Nombre de personnes</div>
                  <div className="font-semibold">
                    {watchedValues.adultsNum} adulte(s) + {watchedValues.enfantNum} enfant(s)
                  </div>
                  <div className="text-sm text-primary font-medium">
                    Total: {(watchedValues.adultsNum || 0) + (watchedValues.enfantNum || 0)} personnes
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Services sélectionnés</div>
                  <div className="font-semibold">{selectedServicesCount} service(s)</div>
                  {selectedServicesCount > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {servicesList
                        .filter(service => watchedValues.services?.[service.key])
                        .slice(0, 3)
                        .map(service => (
                          <Badge key={service.key} variant="secondary" className="text-xs">
                            {service.icon} {service.label}
                          </Badge>
                        ))}
                      {selectedServicesCount > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{selectedServicesCount - 3} autres
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};