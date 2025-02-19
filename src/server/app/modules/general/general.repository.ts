import { prisma } from "../../../../infra/db/prisma/prismaClient";

export class GeneralRepository {
  
  async getAllDomainExtensions() {
    return await prisma.tldlist.findMany();
  }

  async getAllCountries() {
    return await prisma.countries.findMany();
  }

  async getCities(countryId: number) {
    return await prisma.cities.findMany({
      where: { country_id: countryId },
      select: {
        name: true,
        country_id: true,
        slug: true,
      },
    });
  }

  async getPlans(categoryId: number) {
    return await prisma.products.findMany({
      where: {
        category: categoryId,
        visibility: "visible",
        status: 'active'
      },
    });
  }

  async getPlanAddon(planId: number) {
    return await prisma.products_lang.findFirst({
      where: {
        owner_id: planId,
        lang: 'pt'
      }
    })
  }

  async getPlan(id: number) {
    return await prisma.products.findFirst({
      where: { id },
    });
  }

  async getProductPrice(productId: number, period: 'year'| 'month') {
    return await prisma.prices.findFirst({
        where: {
            owner_id: productId,
            period,
            time: 1
        }
    })
}
}
