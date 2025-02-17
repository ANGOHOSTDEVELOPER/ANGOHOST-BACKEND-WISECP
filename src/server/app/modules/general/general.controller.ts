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

export async function getPlans(
  req: FastifyRequest<{Params: { type: string }}>,
  reply: FastifyReply
) {
  try {
    const { type } = req.params;

    if (!type) {
      return reply.status(400).send({
        success: false,
        message: "Type not founded!",
      });
    }
    const plans = await generalService.getPlans(type);
    if (!plans) {
      return reply.status(404).send({
        success: false,
        message: "Type not founded!",
      });
    }
    return reply.status(200).send({
      success: true,
      message: `${type.toLocaleLowerCase()} plans founded successfully!`,
      data: plans,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}

export async function getPlan(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const plan = await generalService.getPlan(parseInt(id));
    return reply.status(200).send({
      success: true,
      message: "Plan founded successfully!",
      data: plan,
    });
  } catch (error) {
    reply
      .status(500)
      .send({ success: false, message: "Internal server error", error });
  }
}
