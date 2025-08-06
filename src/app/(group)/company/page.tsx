import Link from "next/link";
import { Button } from "@radix-ui/themes";
import prismaClient from "@/services/prisma";

export default async function CompanyPage() {
    const companies = await prismaClient.company.findMany({
        include: {
            owner: true,
        },
    });

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <header className="py-4 w-full">
                <Link href="/jobs">
                    <Button variant="soft">
                        Go Back
                    </Button>
                </Link>
            </header>

            <section className="flex flex-col gap-6">
                {companies.map((company) => (
                    <Link key={company.id} href={`/company/${company.id}`}>
                        <div
                            key={company.id}
                            className="job-card-dark rounded-lg border p-6 shadow-md"
                        >
                            <h2 className="text-xl font-semibold">{company.name}</h2>
                            <p className="text-gray-600">{company.description}</p>
                            <p className="text-sm text-gray-400 mt-2">
                                Owned by: {company.owner?.name || "Unknown"}
                            </p>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
