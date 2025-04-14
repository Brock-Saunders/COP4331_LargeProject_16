import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import HomePage from '../pages/HomePage';

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  render: (args) => {
    const MockedLogin = (props: any) => {
      const navigate = useNavigate();

      const handleLogin = (username: string, password: string) => {
        if (username === 'JaneDoe' && password === 'password123') {
          alert('Login successful!');
          navigate('/home'); // Navigate within the MemoryRouter context
        } else {
          alert('Invalid username or password.');
        }
      };

      return <Login {...props} onLogin={handleLogin} />;
    };

    return (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<MockedLogin {...args} />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
  },
};