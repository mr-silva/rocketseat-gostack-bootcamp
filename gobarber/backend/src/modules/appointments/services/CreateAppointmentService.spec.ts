import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create a new appointment when date is not available', async () => {
    const appointmentDate = new Date(2020, 4, 22, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create appointment in the same date for diferent provider', async () => {
    const appointmentDate = new Date(2020, 4, 22, 11);

    const appointmentWithProvider123 = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123',
    });

    const appointmentWithProvider1234 = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1234',
    });

    expect(appointmentWithProvider123).toHaveProperty('id');
    expect(appointmentWithProvider1234).toHaveProperty('id');
  });
});