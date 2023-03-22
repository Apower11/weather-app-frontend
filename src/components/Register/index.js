import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useContext, useState } from 'preact/hooks';
import axios from 'axios';
import style from './style.css';
import { AuthContext } from '../../shared/context/auth-context';
const Auth = () => {
  const auth = useContext(AuthContext);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post("https://weatherapp-group34-backend-api.herokuapp.com/user/register", {
        email: values.emailAddress,
        password: values.password
    }).then(res => {
        console.log(res.data);
        auth.login(res.data.user._id, res.data.user, res.data.token);
    }).catch(err => {
        console.log(err);
    })
  };
    
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="emailAddress"
        rules={[
          {
            required: true,
            message: 'Please input your Email Address!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
        </Button>
        <span className={style.alternative_text}>Or <a href="/login">login now!</a></span>
      </Form.Item>
    </Form>
  );
};
export default Auth;