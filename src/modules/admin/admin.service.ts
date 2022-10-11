import { getCustomRepository } from 'typeorm';
import { AppObject } from '../../common/consts';
import { ErrorHandler } from '../../libs/errors';
import { AdminLoginParams } from '../auth/auth.interface';
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

  async init() {
    return this.adminRepository.save(
      this.adminRepository.create({
        email: 'admin@anamcoffee.com',
        password: 'adminA#@123456',
        firstName: 'Super',
        lastName: 'Admin',
        role: AppObject.ROLES.SUPER_ADMIN,
      })
    );
  }

  async login(params: AdminLoginParams) {
    const adminFound = await this.adminRepository.detailByConditions({
      conditions: {
        email: params.email.toLowerCase(),
        status: AppObject.USER_STATUS.ACTIVE,
      },
      select: ['id', 'password'],
    });

    console.log(adminFound);

    if (!adminFound) {
      throw new ErrorHandler({ message: 'accountNotFound' });
    }

    if (!adminFound.comparePassword(params.password)) {
      throw new ErrorHandler({ message: 'wrongPassword' });
    }

    return adminFound;
  }
}
