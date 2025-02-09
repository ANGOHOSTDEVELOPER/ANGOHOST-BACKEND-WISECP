import { OrderRepository } from "../order/order.repository";
import { UserRepository } from "../user/user.repository";
import { CreateInvoiceDtoType } from "./dtos/createInovice.dto";
import { CreateInvoiceItemDtoType } from "./dtos/createInvoiceItem.dto";
import { InvoiceRepository } from "./invoice.repository";

interface HostingCategory {
  category_name: string;
  category_id: string;
  established: boolean;
  domain: string;
  panel_type: string;
}

async function generateInvoiceNumber(invoiceRepository: InvoiceRepository) {
  const lastInvoiceNumber = await invoiceRepository.getLastInvoiceNumber();
  const refinedNumber = (lastInvoiceNumber?.id as number) + 1;
  const invoiceNumber = "#" + refinedNumber.toString();
  return invoiceNumber;
}

export class InvoiceService {
  private readonly invoiceRepository: InvoiceRepository;
  private readonly orderRespository: OrderRepository;
  private readonly userRpository: UserRepository;

  constructor() {
    this.invoiceRepository = new InvoiceRepository();
    this.orderRespository = new OrderRepository();
    this.userRpository = new UserRepository();
  }

  async createInvoice(data: CreateInvoiceDtoType) {
    try {
      const { products, number, user_data, user_id, ...rest } = data;

      const invoiceNumber = await generateInvoiceNumber(this.invoiceRepository);
      const address = await this.userRpository.getUserAddress(user_id);
      const userData = `{\"identity\":null,\"kind\":\"${
        address[address.length - 1].kind
      }\",\"full_name\":\"${
        address[address.length - 1].full_name
      }\",\"email\":\"${
        address[address.length - 1].email
      }\",\"landline_phone\":\"\",\"address\":{\"country_id\":${
        address[address.length - 1].country_id
      },\"country_code\":\"AO\",\"country_name\":\"Angola\",\"city\":${
        address[address.length - 1].city
      },\"counti\":\"${address[address.length - 1].counti}\",\"zipcode\":\"${
        address[address.length - 1].zipcode
      }\",\"address\":\"${address[address.length - 1].address}\"},\"gsm\":\"${
        address[address.length - 1].phone
      }\"}`;

      const invoice = await this.invoiceRepository.createInvoice({
        ...rest,
        number: invoiceNumber,
        user_data: userData,
        user_id,
        products: [],
      });
      let total = 0;
      for (const product of products) {
        await this.orderRespository.updateInvoiceId(product.id, invoice.id);
        const prod = await this.orderRespository.getOrderById(product.id);
        if (prod.type === "domain") {
          const invoiceItem: CreateInvoiceItemDtoType = {
            parent_id: 0,
            owner_id: invoice.id,
            user_id: invoice.user_id,
            user_pid: prod.id,
            description: `${prod.name} (#${prod.id}) (Registo de domínio) | ${
              prod.period_time
            } ${
              prod.period
            } ${prod.renewaldate.getFullYear()} - ${prod.cdate.getFullYear()}`,
            quantity: product.quantity,
            taxexempt: 0,
            amount: prod.amount.toNumber(),
            total_amount: prod.total_amount.toNumber(),
            currency: product.currency,
            rank: product.rank,
            oduedate: new Date().toISOString(),
            options: `{\"event\":\"DomainNameRegisterOrder\",\"type\":\"domain\",\"id\":\"${
              prod.id
            }\",\"period\":\"${prod.period}\",\"period_time\":\"${
              prod.period_time
            }\",\"category\":\"Registo de domínio\",\"category_route\":\"https://www.angohost.ao/domain\",\"sld\":\"${
              prod.name?.split(".")[0]
            }\",\"tld\":\"${prod.name?.split(".")[1]}${
              prod.name?.split(".")[2] && "." + prod.name?.split(".")[2]
            }\",\"dns\":{\"ns1\":\"ns1.angohost.net\",\"ns2\":\"ns2.angohost.net\"}}`,
          };
          const createdInvoiceItem = await this.createInvoiceItem(invoiceItem);
          total += createdInvoiceItem.amount.toNumber();
        }
        if (prod.type === "hosting") {
          const obj = JSON.parse(prod.options as string) as HostingCategory;
          const invoiceItem: CreateInvoiceItemDtoType = {
            parent_id: 0,
            owner_id: invoice.id,
            user_id: invoice.user_id,
            user_pid: prod.id,
            description: `${prod.name} (#${prod.id}) (${obj.domain}) | ${
              prod.period_time
            } ${
              prod.period
            } ${prod.renewaldate.getFullYear()} - ${prod.cdate.getFullYear()}`,
            quantity: product.quantity,
            taxexempt: 0,
            amount: prod.amount.toNumber(),
            total_amount: prod.total_amount.toNumber(),
            currency: product.currency,
            rank: product.rank,
            oduedate: new Date().toISOString(),
            options: `{\"event\":\"DomainNameRegisterOrder\",\"type\":\"domain\",\"id\":\"${
              prod.id
            }\",\"period\":\"${prod.period}\",\"period_time\":\"${
              prod.period_time
            }\",\"category\":\"Registo de domínio\",\"category_route\":\"https://www.angohost.ao/domain\",\"sld\":\"${
              prod.name?.split(".")[0]
            }\",\"tld\":\"${prod.name?.split(".")[1]}${
              prod.name?.split(".")[2] && "." + prod.name?.split(".")[2]
            }\",\"dns\":{\"ns1\":\"ns1.angohost.net\",\"ns2\":\"ns2.angohost.net\"}}`,
          };
          const createdInvoiceItem = await this.createInvoiceItem(invoiceItem);
          total += createdInvoiceItem.amount.toNumber();
        }
      }
      return await this.invoiceRepository.updateInvoiceAmount(
        total,
        total,
        invoice.id
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createInvoiceItem(data: CreateInvoiceItemDtoType) {
    return await this.invoiceRepository.createInvoiceItem(data);
  }
}
