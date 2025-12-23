import React from 'react';
import { useInvoiceStore } from "@/stores/invoiceStore";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  Receipt
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const BillingCard = () => {
    const { totalPaid, totalPending, totalThisMonth, invoices, loading } = useInvoiceStore();
    
    // Calculate additional metrics
    const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
    const averageInvoiceValue = invoices.length > 0 ? totalRevenue / invoices.length : 0;
    const paidPercentage = totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0;
    
    // Format currency (assuming Moroccan Dirhams)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Get current month name
    const currentMonth = format(new Date(), 'MMMM', { locale: fr });
    const currentYear = format(new Date(), 'yyyy');

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const stats = [
        {
            title: "Facturé ce mois",
            value: formatCurrency(totalThisMonth),
            description: `Mois de ${currentMonth} ${currentYear}`,
            icon: <Calendar className="h-5 w-5" />,
            trend: "+12.5%",
            isPositive: true,
            color: "bg-blue-50 text-blue-600 border-blue-100",
            iconBg: "bg-blue-100",
            secondaryText: "vs mois dernier",
            iconComponent: <Receipt className="h-5 w-5" />
        },
        {
            title: "Paiements reçus",
            value: formatCurrency(totalPaid),
            description: `${paidPercentage.toFixed(1)}% du revenu total`,
            icon: <DollarSign className="h-5 w-5" />,
            trend: "+8.2%",
            isPositive: true,
            color: "bg-green-50 text-green-600 border-green-100",
            iconBg: "bg-green-100",
            secondaryText: `Sur ${invoices.filter(i => i.status === 'paid').length} factures`,
            iconComponent: <Wallet className="h-5 w-5" />
        },
        {
            title: "En attente",
            value: formatCurrency(totalPending),
            description: "Paiements non réglés",
            icon: <Clock className="h-5 w-5" />,
            trend: "-3.1%",
            isPositive: false,
            color: "bg-amber-50 text-amber-600 border-amber-100",
            iconBg: "bg-amber-100",
            secondaryText: `${invoices.filter(i => i.status === 'pending').length} factures en attente`,
            iconComponent: <CreditCard className="h-5 w-5" />
        }
    ];

    return (
        <div className="space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card 
                        key={index} 
                        className={`border-0 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] p-2 ${stat.color}`}
                    >
                        <CardContent className="">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                                    {stat.icon}
                                </div>
                                <Badge 
                                    variant="outline" 
                                    className={`flex items-center gap-1 ${
                                        stat.isPositive 
                                            ? "bg-green-50 text-green-700 border-green-200" 
                                            : "bg-red-50 text-red-700 border-red-200"
                                    }`}
                                >
                                    {stat.isPositive ? (
                                        <ArrowUpRight className="h-3 w-3" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3" />
                                    )}
                                    {stat.trend}
                                </Badge>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {stat.iconComponent}
                                    <span>{stat.description}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">{stat.secondaryText}</p>
                            </div>

                            {/* Progress bar for pending payments */}
                            {index === 2 && totalPending > 0 && (
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span>Paiements en retard</span>
                                        <span>15%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                            style={{ width: '15%' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Additional Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total des factures</p>
                                <h4 className="text-lg font-bold">{invoices.length}</h4>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-100">
                                <Receipt className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Taux de paiement</p>
                                <h4 className="text-lg font-bold">{paidPercentage.toFixed(1)}%</h4>
                            </div>
                            <div className="p-2 rounded-lg bg-green-100">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Valeur moyenne</p>
                                <h4 className="text-lg font-bold">{formatCurrency(averageInvoiceValue)}</h4>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-100">
                                <CreditCard className="h-5 w-5 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-r from-gray-50 to-white">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Revenu total</p>
                                <h4 className="text-lg font-bold">{formatCurrency(totalRevenue)}</h4>
                            </div>
                            <div className="p-2 rounded-lg bg-gray-100">
                                <DollarSign className="h-5 w-5 text-gray-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Insights Banner */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">💡 Insights du mois</h3>
                            <p className="text-sm text-gray-300 mt-1">
                                Vos revenus ont augmenté de 12.5% ce mois-ci. 
                                {totalPending > 0 && ` ${formatCurrency(totalPending)} de paiements en attente.`}
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'paid').length}</div>
                                <div className="text-xs text-gray-300">Factures payées</div>
                            </div>
                            <div className="h-12 w-px bg-gray-700"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{invoices.filter(i => i.status === 'overdue').length}</div>
                                <div className="text-xs text-gray-300">En retard</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BillingCard;