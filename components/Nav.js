import styles from "./Nav.less";
// import fetch, { syncRequest } from "../utils/request";
const Demo = ({ title }) => {
  return (
    <div className={styles.nav}>
      <a href="/">Home</a>
      <a href="/hello">Hello</a>
      <a href="/blog">Blog</a>
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
