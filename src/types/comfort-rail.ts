export type ComfortRail = {
  id: number;
  category: {
    name: string;
    slug: string;
    image: string | null;
  };
  products: {
    id: number;
    name: string;
    slug: string;
    price: string;
    old_price: string | null;
    main_image: string | null;
  }[];
};
