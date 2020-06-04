import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProviders/models/IStorageProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlearsMailTemplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
