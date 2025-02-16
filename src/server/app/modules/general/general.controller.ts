import { FastifyReply, FastifyRequest } from "fastify";
import { GeneralService } from "./general.service";

const generalService = new GeneralService();

export async function getAllDomainExtensions(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const domainExtensions = await generalService.getAllDomainExtensions();
    if (!domainExtensions) {
      return reply.status(400).send({
        success: false,
        message: "Domain extensions not found!",
      });
    }
    return reply.status(200).send({
      success: true,
      message: "Domain extensions founded successfully!",
      data: domainExtensions,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}

export async function getAllCountries(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const countries = await generalService.getAllCountries();
    return reply.status(200).send({
      success: true,
      message: "Countries founded successfully!",
      data: countries,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}

export async function getCities(
  req: FastifyRequest<{ Params: { countryId: string } }>,
  reply: FastifyReply
) {
  try {
    const { countryId } = req.params;
    const counties = await generalService.getCities(parseInt(countryId));
    return reply.status(200).send({
      success: true,
      message: "Counties founded successfully!",
      data: counties,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}


export async function getAllHostingPlans(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    
    const plans = await generalService.getAllHostingPlans();
    return reply.status(200).send({
      success: true,
      message: "Hosting plans founded successfully!",
      data: plans,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}

export async function getHostingPlan(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const plan = await generalService.getHostingPlan(parseInt(id));
    return reply.status(200).send({
      success: true,
      message: "Hosting plan founded successfully!",
      data: plan,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}
