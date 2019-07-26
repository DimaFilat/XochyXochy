import { Button } from 'semantic-ui-react';
import { Col } from 'reactstrap';
import React from 'react';

export default function Delete() {
  return (
    <div>
      <Col xs="2">
        <Button style={{ width: '125px' }}>Удалить</Button>
      </Col>
    </div>
  );
}
