import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de semha');
  }
}

export default SendForgotPasswordEmailService;
