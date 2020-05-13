import React from 'react';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <h1>Dashboard</h1>
        <Button type="button" onClick={signOut}>
          Log Out
        </Button>
      </Content>
    </Container>
  );
};

export default Dashboard;
