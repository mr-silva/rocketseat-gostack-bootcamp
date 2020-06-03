import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificatiosRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 2, 13),
      user_id: 'user',
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
    expect(appointment.user_id).toBe('user');
  });

  it('should not be able to create a new appointment when date is not available', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    const appointmentDate = new Date(2020, 5, 2, 13);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: 'user',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 26, 12),
        provider_id: '123',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 2, 13),
        provider_id: 'user',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment in an invalid hour', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 3, 7),
        provider_id: 'provider',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 3, 18),
        provider_id: 'provider',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment in the same date for diferent provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 5, 2, 12).getTime();
    });

    const appointmentDate = new Date(2020, 5, 2, 13);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
      user_id: 'user',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1234',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
