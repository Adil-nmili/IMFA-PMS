import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, UserCircle, BedDouble, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SejourTab } from "@/components/partials/reservationTabs/sejourTab.reservation";
import ConfirmationTab from "@/components/partials/reservationTabs/confirmation.reservation";
import { ClientTab } from "@/components/partials/reservationTabs/clientTab.reservation";

const NewReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("client");

  const tabs = [
    {
      value: "client",
      label: "Informations du client",
      icon: UserCircle,
      description: "Détails personnels et coordonnées",
    },
    {
      value: "sejour",
      label: "Détails du séjour",
      icon: BedDouble,
      description: "Dates, chambres et services",
    },
    {
      value: "confirmation",
      label: "Confirmation",
      icon: CheckCircle,
      description: "Vérifier et confirmer la réservation",
    },
  ];

  const handleBack = () => {
    navigate("/reservations");
  };

  const getTabIndex = (value: string) => {
    return tabs.findIndex((tab) => tab.value === value);
  };

  const handleNextTab = () => {
    const currentIndex = getTabIndex(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].value);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = getTabIndex(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux réservations
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Nouvelle Réservation
              </h1>
              <p className="text-gray-600 mt-1">
                Créez une nouvelle réservation en suivant les étapes ci-dessous
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-6 border-primary/10 shadow-sm p-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const currentIndex = getTabIndex(activeTab);
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <React.Fragment key={tab.value}>
                    <div className="flex flex-col items-center flex-1">
                      <button
                        onClick={() => setActiveTab(tab.value)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all mb-2 ${
                          isCompleted
                            ? "bg-green-500 text-white shadow-lg"
                            : isCurrent
                            ? "bg-primary text-white shadow-lg scale-110"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </button>
                      <div className="text-center">
                        <p
                          className={`text-sm font-medium ${
                            isCurrent ? "text-primary" : "text-gray-600"
                          }`}
                        >
                          {tab.label}
                        </p>
                        <p className="text-xs text-gray-500 hidden md:block">
                          {tab.description}
                        </p>
                      </div>
                    </div>
                    {index < tabs.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-4 rounded transition-all ${
                          index < currentIndex
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="client" className="space-y-4">
            <Card className="border-none shadow-lg">
              <CardContent className="">
                <ClientTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sejour" className="space-y-4">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <SejourTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmation" className="space-y-4">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <ConfirmationTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Footer */}
        <Card className="mt-6 border-primary/10 shadow-sm sticky bottom-4 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousTab}
                disabled={activeTab === "client"}
                className="min-w-[120px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>

              <div className="flex items-center gap-2">
                {tabs.map((tab, index) => (
                  <div
                    key={tab.value}
                    className={`h-2 rounded-full transition-all ${
                      tab.value === activeTab
                        ? "w-8 bg-primary"
                        : index < getTabIndex(activeTab)
                        ? "w-2 bg-green-500"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {activeTab === "confirmation" ? (
                <Button className="min-w-[120px] bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  Confirmer
                </Button>
              ) : (
                <Button onClick={handleNextTab} className="min-w-[120px]">
                  Suivant
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewReservationPage;
