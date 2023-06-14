type CategoryRow = {
  category: string;
  palette1: string;
  palette2: string;
  palette3: string;
  id: number;
  img: string;
  title: string;
  price: number;
};

/** convert range values [[col names], [row1], [row2], ...]
 *  to an array of Category Items
 *  */

export const processExcelResult = (rangeValues: string[][]): CategoryItem[] => {

  console.log(rangeValues[0])
  const columnNames: string[] = rangeValues[0];

  const inputRows: CategoryRow[] = rangeValues.slice(1).map((row) => {
    const currRow: CategoryRow = columnNames.reduce((acc, columnName, n) => {
      let value: string | number = row[n];
      if (columnName === 'price') {
        value = parseFloat(value);
      }
      (acc as any)[columnName] = value;
      return acc;
    }, {} as CategoryRow);
    return currRow;
  });

  const result: CategoryItem[] = inputRows.reduce((acc: CategoryItem[], row) => {
    const { category, palette1, palette2, palette3, ...item } = row;
    const existingCategory = acc.find((item) => item.category === category);

    if (existingCategory) {
      existingCategory.items.push(item);
    } else {
      const newCategory: CategoryItem = {
        category,
        palette1,
        palette2,
        palette3,
        items: [item],
      };
      acc.push(newCategory);
    }
    return acc;
  }, []);
  return result;
};