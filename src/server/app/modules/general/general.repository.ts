import { prisma } from "../../../../infra/db/prisma/prismaClient";

export class GeneralRepository{
    async getAllDomainExtensions() {
        return await prisma.tldlist.findMany()
    }

    async getAllCountries() {
        return await prisma.countries.findMany()
    }

    async getCities(countryId: number) {
        return await prisma.cities.findMany({
            where: { country_id: countryId }, select: { 
                name: true,
                country_id: true,
                slug: true
             }
        })
    }

    async getAllHostingPlans() {
        return await prisma.products.findMany({
            where: {
                category: 320,
                visibility: 'visible'
            }
        })
    }

    async getHostingPlan(id: number) {
        return await prisma.products.findFirst({
            where: { id }
        })
    }
}