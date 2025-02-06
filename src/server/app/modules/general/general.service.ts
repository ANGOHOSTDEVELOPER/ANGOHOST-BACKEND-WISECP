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
}