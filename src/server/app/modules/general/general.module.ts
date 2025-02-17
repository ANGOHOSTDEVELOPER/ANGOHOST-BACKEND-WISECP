import { FastifyInstance } from "fastify";
import { getAllCountries, getAllDomainExtensions, getPlans, getCities, getPlan } from "./general.controller";

export async function generalModule(fastify: FastifyInstance){
    fastify.get("/getAllDomainExtensions", getAllDomainExtensions)
    fastify.get("/getAllCountries", getAllCountries)
    fastify.get("/getCities/:countryId", getCities)
    fastify.get("/getPlans/:type", getPlans)
    fastify.get("/getPlan/:id", getPlan)
}