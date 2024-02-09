import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user5 from "../../assets/images/users/user5.jpg";



const ProjectTables = ({singleParticipationsList}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Participate user Listing</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          Upcoming Events
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Participate user</th>
                <th>Enrollment No.</th>

                <th>Event Name</th>
                <th>Subevent Name</th>
              </tr>
            </thead>
            <tbody>
              {singleParticipationsList &&   singleParticipationsList.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={user5}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.Enrollment}</td>
                  <td>{tdata.eventName}</td>
                  <td>{tdata.subEventName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
