import React, { useState } from "react"; 
import { Tabs, TabsList, TabsTrigger, TabsContent, } from "@/components/ui/tabs";
import { FiUser, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { ClientTab } from "../reservationTabs/clientTab.reservation"; 
import { Form } from "react-router-dom"; 
import { SejourTab } from "../reservationTabs/sejourTab.reservation"; 
import { Button } from "@/components/ui/button"; 
import ConfirmationTab from "../reservationTabs/confirmation.reservation"; 
import useAppState from "@/stores/authStore";
const ReservationModal: React.FC = () => {
  // const reservationInfo = useAppState((state) => state.reservation);

  const [activeTab, setActiveTab] = useState("client");
  const [isLoading, setIsLoading] = useState(false);

  const confirmReservation = async () => {
    // console.log(reservationInfo);
    try {
      setIsLoading(true);
      // simulate async action
      await new Promise((r) => setTimeout(r, 1000));
      if (activeTab === "client") setActiveTab("sejour");
      else if (activeTab === "sejour") setActiveTab("confirmation");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
<TabsList className="grid w-full grid-cols-3 bg-transparent rounded-none">
          <TabsTrigger
            value="client"
            className={`flex items-center justify-center gap-2 rounded-b-2xl rounded-t-none p-4 transition-all ${
              activeTab === "client" ? "text-primary font-semibold" : "text-gray-500 "
            }`}
          >
            <FiUser className="text-4xl" style={{ fontSize: '2rem' }} />
            <span>Informations du client</span>
          </TabsTrigger>

          <TabsTrigger
            value="sejour"
            className={`flex items-center justify-center gap-2 rounded-b-2xl rounded-t-none p-4 transition-all ${
              activeTab === "sejour" ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            <FiCalendar className="text-lg" />
            <span>Détails du séjour</span>
          </TabsTrigger>

          <TabsTrigger
            value="confirmation"
            className={`flex items-center justify-center gap-2 rounded-b-2xl rounded-t-none p-4 transition-all ${
              activeTab === "confirmation" ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            <FiCheckCircle className="text-lg" />
            <span>Confirmation</span>
          </TabsTrigger>
        </TabsList>
        <Form>
        <TabsContent value="client" className="mt-4 p-8 bg-white/70 rounded-xl">
          <ClientTab />
        </TabsContent>
        <TabsContent value="sejour" className="mt-4 p-8 bg-white/70 rounded-xl">
          <SejourTab />
        </TabsContent>
        <TabsContent
          value="confirmation"
          className="mt-4 p-8 bg-white/70 rounded-xl"
        >
          <ConfirmationTab />
        </TabsContent>

      </Form>
      </Tabs>

      <div className="flex justify-end gap-4 mt-2">
        <Button
          variant="outline"
          className="bg-[#958E85] w-50 h-12 text-white rounded"
          onClick={() => {
            if (activeTab === "sejour") setActiveTab("client");
            else if (activeTab === "confirmation") setActiveTab("sejour");
          }}
        >
          {activeTab === "client" ? "Annuler" : "Retour"}
        </Button>

        <Button
          onClick={confirmReservation}
          disabled={activeTab === "confirmation"}
          className="bg-[#3F3124] text-white rounded w-50 h-12"
        >
          {isLoading ? "..." : "Continuer"}
        </Button>
      </div>
    </div>
  );
};

export default ReservationModal;
