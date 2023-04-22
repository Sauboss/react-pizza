import React from 'react';

type CategoriesProps = {
  value:number;
  onClickCategory:(i:number) => void;
}

const categoris = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories:React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

  const activeClick = (sum:number) => {
    onClickCategory(sum);
  };

  return (
    <div className="categories">
      <ul>
        {categoris.map((CategoryName, index) => (
          <li
            key={CategoryName}
            onClick={() => activeClick(index)}
            className={value === index ? 'active' : ''}>
            {CategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
