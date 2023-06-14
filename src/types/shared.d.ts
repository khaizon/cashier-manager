type Item = {
  id: number;
  img: string;
  title: string;
  price: number;
};

type CategoryItem = {
  category: string;
  palette1: string;
  palette2: string;
  palette3: string;
  items: Item[];
};
