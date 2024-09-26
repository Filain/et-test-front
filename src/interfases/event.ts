 export interface IEvent {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  organizer: string;
  date: string;
 }

 export interface IEventList {
   data: IEvent[];
   meta: {
     page: number;
     total: number;
   };
 }