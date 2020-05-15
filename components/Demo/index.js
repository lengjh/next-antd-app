import styles from "./index.less";
import fetch, { syncRequest, sleep } from "../../utils/request";
const Demo = ({ title }) => {
  const { data = {}, error } = sleep(3000);
  console.log(data, error);
  try {
    // alert(0);
  } catch (error) {
    //
  }
  return (
    <div className={styles.demo}>
      <h2>异步加载组件</h2>
      <img src="/zeit.svg" alt="" />
    </div>
  );
};
// Demo.getInitialProps = async () => {

//     // const res = await fetch('');
//     // const json = await res.json()
//     console.log(3333, data)
//     return { title: data.size }

// }
export default Demo;
