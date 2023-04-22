import styles from './NotFoundBlock.module.scss'

const NotFoundBlock:React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span></span>
        <br />
        Ничего не найдено :(
      </h1>
      <br />
      <p className={styles.description}>К сожалени данная страница отсутсвует в нашем интернет-магазине</p>
    </div>
  )
}
export default NotFoundBlock