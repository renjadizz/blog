import { Spin } from 'antd';

function Loading() {
  //const { Content } = Layout;
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
}
export default Loading;
