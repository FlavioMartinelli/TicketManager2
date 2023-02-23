interface Passenger {
    name: string,
    last_name: string,
    email: string,
    tel: string
}
export interface TicketInfo {
    passenger: Passenger,
    extras: Passenger[],
    date: Fulldate
}

export interface bookingData { 
    name: string;
    email: string;
    tel: string ;
    fulldate: Fulldate;
    extras: {eName:string, eEmail:string, eTel:number}[]; 
  }
  
  export interface time {
    time: string,
    available: boolean
  }
  
  export interface Fulldate {
    year: number;
    day: number ;
    month: number ;
    time: string ;
  }
  