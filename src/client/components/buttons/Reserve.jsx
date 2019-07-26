import { Button } from 'semantic-ui-react';
import { Col } from 'reactstrap';
import React from 'react';

export default function Reserve() {
  return (
    <div>
      <Col xs="2">
        <Button style={{ backgroundColor: 'lightblue', width: '125px' }}>Резерв</Button>
      </Col>
    </div>
  );
}
