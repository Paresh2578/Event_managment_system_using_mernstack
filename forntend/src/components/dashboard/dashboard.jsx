import React from 'react'
import { Col, Row } from "reactstrap";

//compontes
import SalesChart from './SalesChart'
import ProjectTables from './ProjectTable'

export default function Dashboard() {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col>
          <SalesChart />
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          {/* <ProjectTables /> */}
        </Col>
      </Row>
    </div>
  )
}
