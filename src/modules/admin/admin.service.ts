import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ParamsCommonGetDetail } from '../../common/interfaces';
import { ErrorHandler } from '../../libs/errors';
import { AdminLoginParams } from '../auth/auth.interface';
import { Admin } from './admin.entity';
import { CreateAdminParams } from './admin.model';
import { AdminRepository } from './admin.repository';

export class AdminService {
  private static instance: AdminService;
  private adminRepository: AdminRepository;

  constructor() {
    if (AdminService.instance) {
      return AdminService.instance;
    }

    this.adminRepository = getCustomRepository(AdminRepository);
    // this.init();
    AdminService.instance = this;
  }

  async detailByConditions(params: ParamsCommonGetDetail<Admin>) {
    return this.adminRepository.detailByConditions(params);
  }

  async init() {
    return this.adminRepository.createDoc({
      email: 'admin@anamcoffee.com',
      password: 'adminA#@123456',
      firstName: 'Super',
      lastName: 'Admin',
      role: AppObject.ADMIN_ROLES.SUPER_ADMIN,
    });
  }

  async list(params) {
    const alias = 'admin';
    const queryBuilder = this.adminRepository
      .createQueryBuilder(alias)
      .select();

    if (params.search) {
      queryBuilder.andWhere(
        `(${alias}.firstName ILIKE :name OR ${alias}.lastName ILIKE :name)`,
        {
          name: `%${params.search}%`,
        }
      );
    }

    return this.adminRepository.list({
      conditions: queryBuilder,
      paginate: params,
      alias: alias,
    });
  }

  async login(params: AdminLoginParams) {
    const adminFound = await this.adminRepository.detailByConditions({
      conditions: { email: params.email, status: AppObject.USER_STATUS.ACTIVE },
      select: ['id', 'password'],
    });

    if (!adminFound) {
      throw new ErrorHandler({ message: 'accountNotFound' });
    }

    if (!adminFound.comparePassword(params.password)) {
      throw new ErrorHandler({ message: 'wrongPassword' });
    }

    this.adminRepository.updateByConditions({
      conditions: { id: adminFound.id },
      data: { lastLogin: new Date() },
    });

    return adminFound;
  }

  async detailById(id: string) {
    return this.adminRepository.detailByConditions({
      conditions: { id: id },
    });
  }

  async deleteById(id: string) {
    await this.adminRepository.updateByConditions({
      conditions: { id: id },
      data: { status: AppObject.USER_STATUS.DELETED },
    });
    return;
  }

  async create(params: CreateAdminParams) {
    return this.adminRepository.createDoc(params);
  }
}
