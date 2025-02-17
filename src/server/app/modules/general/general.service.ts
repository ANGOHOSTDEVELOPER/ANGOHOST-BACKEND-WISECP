import { GeneralRepository } from "./general.repository";

export class GeneralService{
    private readonly generalRepository: GeneralRepository;

    constructor() {
        this.generalRepository = new GeneralRepository()
    }

    async getAllDomainExtensions() {
        return await this.generalRepository.getAllDomainExtensions()
    }

    async getAllCountries() {
        return await this.generalRepository.getAllCountries()
    }

    async getCities(countryId: number) {
        return await this.generalRepository.getCities(countryId)
    }

    async getPlans(type: string) {
        switch (type) {
            case 'hosting':
                return await this.generalRepository.getAllHostingPlans()
            case 'ssl':
                return await this.generalRepository.getAllSslPlans()
            case 'resale':
            return await this.generalRepository.getAllResalePlans()
        }
    }

    async getPlan(id: number) {
        return await this.generalRepository.getPlan(id)
    }
}