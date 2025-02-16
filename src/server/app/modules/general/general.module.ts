import { FastifyInstance } from "fastify";
import { getAllCountries, getAllDomainExtensions, getAllHostingPlans, getCities, getHostingPlan } from "./general.controller";

export async function generalModule(fastify: FastifyInstance){
    fastify.get("/getAllDomainExtensions", getAllDomainExtensions)
    fastify.get("/getAllCountries", getAllCountries)
    fastify.get("/getCities/:countryId", getCities)
    fastify.get("/getAllHostingPlans", getAllHostingPlans)
    fastify.get("/getHostingPlan/:id", getHostingPlan)
}