import {PrismaClient} from "@prisma/client"

type CrudDelegate = {
  findMany: (...args: any[]) => any;
  findUnique: (...args: any[]) => any;
  create: (...args: any[]) => any;
  update: (...args: any[]) => any;
  delete: (...args: any[]) => any;
};

type PrismaModelName = keyof Omit<
  PrismaClient,
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$extends'
  | '$executeRaw'
  | '$executeRawUnsafe'
  | '$queryRaw'
  | '$queryRawUnsafe'
>;

export class BaseRepository<
  TModel extends PrismaModelName,
  TDelegate extends CrudDelegate,
  TCreate,
  TUpdate
> {
  protected prisma: PrismaClient;
  protected model: TModel;

  constructor(prisma: PrismaClient, model: TModel) {
    this.prisma = prisma;
    this.model = model;
  }

  private get delegate(): TDelegate {
    return this.prisma[this.model] as unknown as TDelegate;
  }

  async getAll(params?: { skip?: number; take?: number }) {
    return this.delegate.findMany({
      skip: params?.skip,
      take: params?.take ?? 10,
    });
  }

  async getById(id: string) {
    return this.delegate.findUnique({
      where: { id },
    });
  }

  async create(data: TCreate) {
    return this.delegate.create({ data });
  }

  async update(id: string, data: TUpdate) {
    return this.delegate.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.delegate.delete({
      where: { id },
    });
  }
}
