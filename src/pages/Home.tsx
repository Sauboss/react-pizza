import React from 'react';
import {useSelector } from 'react-redux';
import { setCurrentPage, setCategoryId, selectFilter } from '../redux/slices/filterSlice';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzasSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

function Home() {
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onClickCategory = React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  },[]);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    dispatch(
      //@ts-ignore
      fetchPizzas({ category, search, currentPage, sort }));
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj:any) => (
      <PizzaBlock {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={(number:number) => dispatch(setCurrentPage(number))} />
    </div>
  );
}

export default Home;
