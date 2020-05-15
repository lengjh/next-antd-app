import fetch, { syncRequest } from '../utils/request';
// import Demo from '../components/Demo'
import { useEffect, useState } from "react";
import { Card } from "antd";
import dynamic from "next/dynamic";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import styles from "./hello.less";
import Nav from "../components/Nav";
const DynamicComponent = dynamic(() => import("../components/Demo"), {
  loading: () => <p>正在加载...</p>,
  ssr: false,
});

const App = ({ title, size, data }) => {
  // const { data } = syncRequest('/api/user');
  // .then((res) => {
  //     return res.json();
  // })
  // .then((res) => {
  //     console.log(res)
  // })
  // .catch((err) => {
  //     console.log(err)
  // });
  const { list } = data || {};
  console.log('list', list)
  const [show, setShow] = useState(false);
  useEffect(() => {


  });
  return (
    <div className={styles.box}>
      <Nav />
      <h1>{title}</h1>
      <div>
        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={() => {
            setShow(true);
          }}
        >
          加载组件
        </Button>
      </div>
      {show ? <DynamicComponent /> : null}
      {list.map((item) => {
        const { content, title, imageUrl } = item;
        return <Card title={title}>
          <div>{content}</div>
          <div><img src={imageUrl} /></div>
        </Card>
      })}
    </div>
  );
};

App.getInitialProps = async () => {
  const res = await fetch('https://api.codeyun.xyz/api/article');
  const json = await res.json();
  const { data } = json || {};
  return { title: "Hello Nextjs", size: 22, data };
};
export default App;
