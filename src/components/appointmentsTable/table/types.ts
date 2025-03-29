import { Dayjs } from 'dayjs';
import { useState } from 'react';

export interface TAppointments {
  date: Dayjs | string,
  loadingChange: typeof useState<boolean>
  loading: boolean

  }
export interface DateP {
    date: string | Dayjs,
    setDate: typeof useState<string | Dayjs>,

  }

export interface Appointment{
    id: number;
    isBooked: boolean;
    isAvailable: boolean;
    datetime: string;
    therapistId: number;
  }

export interface TRow {
    appointment: Appointment
  }
