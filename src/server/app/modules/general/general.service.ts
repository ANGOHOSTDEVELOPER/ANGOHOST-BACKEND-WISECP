import { GeneralRepository } from "./general.repository";

export class GeneralService {
  private readonly generalRepository: GeneralRepository;

  constructor() {
    this.generalRepository = new GeneralRepository();
  }

  async getAllDomainExtensions() {
    return await this.generalRepository.getAllDomainExtensions();
  }

  async getAllCountries() {
    return await this.generalRepository.getAllCountries();
  }

  async getCities(countryId: number) {
    return await this.generalRepository.getCities(countryId);
  }

  async getPlans(type: string) {
    let categoryId: number = 0;
    let period:"year"|"month" = "year"
    switch (type) {
      case "hosting":
        categoryId = 320;
        period = 'year'
        break;
      case "ssl":
        categoryId = 197;
        period = 'year'
        break;
      case "resale":
        categoryId = 322;
        break;
      case "email":
        categoryId = 324;
        period = 'month'
        break;
    }
    const plans = await this.generalRepository.getPlans(categoryId);

    const plansWithAddons = await Promise.all(
      plans.map(async (plan) => {
        const [lang, price] = await Promise.all([
          this.generalRepository.getPlanAddon(plan.id),
          this.generalRepository.getProductPrice(plan.id, period),
        ]);

        return {
          ...plan,
          addons: JSON.stringify({
            name: lang?.title,
            features: lang?.features, // Corrigindo para "features"
            price: price?.amount,
            discount: price?.discount, // Corrigindo para "discount"
            period: period,
            time: 1
          }),
        };
      })
    );
    return plansWithAddons;
  }

  async getPlan(id: number) {
    return await this.generalRepository.getPlan(id);
  }
}
