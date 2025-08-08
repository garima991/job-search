import Link from "next/link";
import { Button } from "@radix-ui/themes";
import prismaClient from "@/services/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

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
        <main className="p-6 max-w-4xl mx-auto">
            <header className="py-4 w-full">
                <Link href="/jobs">
                    <Button variant="soft">Go Back</Button>
                </Link>
            </header>

            <section className="flex flex-col gap-6">
                {user?.role === "CANDIDATE" ? (
                    companies?.map((company) => (
                        <Link key={company.id} href={`/company/${company.id}`}>
                            <div className="job-card-dark rounded-lg border p-6 shadow-md">
                                <h2 className="text-xl font-semibold">{company.name}</h2>
                                <p className="text-gray-600">{company.description}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Owned by: {company.owner?.name || "Unknown"}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : myCompanies.length === 0 ? (
                    <div>
                        <p>Create your own Company</p>
                        <Link href="/add-company">Add Company</Link>
                    </div>
                ) : (
                    myCompanies.map((company) => (
                        <Link key={company.id} href={`/company/${company.id}`}>
                            <div className="job-card-dark rounded-lg border p-6 shadow-md">
                                <h2 className="text-xl font-semibold">{company.name}</h2>
                            </div>
                        </Link>
                    ))
                )}
            </section>
        </main>
    );
}
