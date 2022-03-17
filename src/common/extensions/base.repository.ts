// import { Document, Model } from 'mongoose';
import { Repository } from 'typeorm';

// export class MongooseRepository<TModel extends Document> {
//   public TSchema: Model<TModel>;

//   constructor(schema: Model<TModel>) {
//     this.TSchema = schema;
//   }

//   async create(params: TModel): Promise<TModel> {
//     return this.TSchema.create(params);
//   }

//   async findOne(params): Promise<TModel> {
//     return this.TSchema.findOne(params.conditions).projection(
//       params.projections
//     );
//   }

//   async detailByConditions(params): Promise<TModel> {
//     return this.TSchema.findOne(params.conditions).projection(
//       params.projections
//     );
//   }

//   async list(params): Promise<TModel[]> {
//     return this.TSchema.find(params.conditions).projection(params.projection);
//   }

//   async listAll(params): Promise<TModel[]> {
//     return this.TSchema.find(params.conditions).projection(params.projection);
//   }

//   async updateMany(params): Promise<any> {
//     return this.TSchema.updateMany(params.conditions, params.data);
//   }

//   async deleteMany(params): Promise<any> {
//     return this.TSchema.deleteMany(params.conditions);
//   }

//   async countByConditions(conditions) {
//     return this.TSchema.countDocuments(conditions);
//   }
// }

export class BaseRepository<T> extends Repository<T> {
  async findOne(params): Promise<T> {
    return this.findOne(params);
  }
}
