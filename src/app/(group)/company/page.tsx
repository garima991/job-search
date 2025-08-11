import Link from "next/link";
import { Button } from "@radix-ui/themes";
import prismaClient from "@/services/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Building2, ArrowLeft, Plus } from "lucide-react";

export default async function CompanyPage() {
    const user = await getCurrentUser();
    const companies = await prismaClient.company.findMany({
        include: {
            owner: true,
        },
    });

    const myCompanies = await prismaClient.company.findMany({
        where: {
            ownerId: user?.id,
        },
        include: {
            owner: true,
        },
    });

    return (
        <div className="min-h-screen bg-black">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl"></div>
            </div>

            <main className="p-4 sm:p-6 max-w-4xl mx-auto relative z-10">
                <header className="py-4 w-full mb-6 sm:mb-8">
                    <Link href="/jobs">
                        <Button variant="soft" className="flex items-center gap-2 text-white hover:text-gray-300">
                            <ArrowLeft size={16} />
                            Go Back
                        </Button>
                    </Link>
                </header>

                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="icon-container">
                            <Building2 className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Companies</h1>
                    </div>
                    <p className="text-gray-400">Discover amazing companies and their opportunities</p>
                </div>

                <section className="flex flex-col gap-4 sm:gap-6">
                    {user?.role === "CANDIDATE" ? (
                        companies?.map((company) => (
                            <Link key={company.id} href={`/company/${company.id}`}>
                                <div className="modern-card p-4 sm:p-6 cursor-pointer">
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{company.name}</h2>
                                    <p className="text-gray-300 mb-3">{company.description}</p>
                                    <p className="text-sm text-gray-400">
                                        Owned by: {company.owner?.name || "Unknown"}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : myCompanies.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="icon-container w-fit mx-auto mb-4">
                                <Plus className="w-8 h-8 text-black" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Create your own Company</h2>
                            <p className="text-gray-400 mb-6">Start posting jobs and building your team</p>
                            <Link href="/add-company">
                                <Button className="btn-primary">
                                    Add Company
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        myCompanies.map((company) => (
                            <Link key={company.id} href={`/company/${company.id}`}>
                                <div className="modern-card p-4 sm:p-6 cursor-pointer">
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{company.name}</h2>
                                    <p className="text-gray-300">{company.description}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}
