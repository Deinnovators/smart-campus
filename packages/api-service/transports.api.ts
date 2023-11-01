import { AxiosInstance, AxiosRequestConfig } from 'axios';
import BaseHttp from './base.http';
import { Endpoints } from './constants/endpoints';
import { DriverNumbers, TransportSchedule, Trip } from 'database';

export class TransportsApi extends BaseHttp {
  private readonly endpoints: Endpoints;

  constructor(readonly instance: AxiosInstance, readonly ep: Endpoints) {
    super(instance);
    this.endpoints = ep;
  }

  async getDrivers(config?: AxiosRequestConfig): Promise<DriverNumbers[]> {
    const res = await this.get({
      endpoint: this.endpoints.transports.drivers,
      config,
    });
    return res.data;
  }
  async getOngoingUpcoming(config?: AxiosRequestConfig): Promise<{
    ongoing: Trip[];
    upcoming: TransportSchedule[];
  }> {
    const res = await this.get({
      endpoint: this.endpoints.transports.ongoing,
      config,
    });
    return res.data;
  }

  async getOngoingTrips(config?: AxiosRequestConfig): Promise<Trip[]> {
    const res = await this.get({
      endpoint: this.endpoints.transports.trips,
      config,
    });
    return res.data;
  }

  async getAllSchedules(
    config?: AxiosRequestConfig,
  ): Promise<TransportSchedule[]> {
    const res = await this.get({
      endpoint: this.endpoints.transports.schedules,
      config,
    });
    return res.data;
  }
}
