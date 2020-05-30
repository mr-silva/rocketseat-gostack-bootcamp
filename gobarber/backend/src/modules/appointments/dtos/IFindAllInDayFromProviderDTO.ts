import IFindAllInMonthFromProviderDTO from './IFindAllInMonthFromProviderDTO';

export default interface IFindAllInDayFromProviderDTO
  extends IFindAllInMonthFromProviderDTO {
  day: number;
}
