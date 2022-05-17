/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus } = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} width="300px" alt="campus" />
      <p>{campus.address}</p>
      <h6>ID: {campus.id}</h6>
      <p>{campus.description}</p>
      {campus.students.length === 0 ? <p>No students enrolled at this </p>: null}
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    
      <button onClick={() => {deleteCampus(campus.id); alert("Campus Deleted!")}}>Delete Campus</button>
    </div>
  );
};

export default CampusView;