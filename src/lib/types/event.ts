export interface eventInputType {
    name: string;
    description: string;
    schedule: string;
    minTeamSize: number;
    maxTeamSize: number;
    coordinators: coordinatorType[];
    price: string;
    prize: string;
    rules: string;
    imagePath: string;
    links: linkType[];
}

export interface coordinatorType {
    name: string;
    email: string;
  }

  export interface linkType{
    title: string;
    url: string;
  }