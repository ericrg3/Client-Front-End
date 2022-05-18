/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  if (student.gpa !== null) { // If they have a gpa
    let gpa = student.gpa // Grab gpa
    if (gpa % 1 === 0) { // If whole number
      gpa = gpa.toFixed(1); // Display with extra decimal place
    }
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h2>{student.email}</h2>
      <h6>ID: {student.id}</h6>
      
      <div>
          <h3>{student.firstname + " " + student.lastname} is not enrolled at a school.</h3>
          <h4>GPA: Not enrolled</h4>
        </div>
      
        <Link to={`/campus/${student.campus.id}`}>
      <h3>{student.campus.name}</h3>
      </Link>

      {student.gpa !== null ? (
            <h4>GPA: {student.gpa}</h4>
          ) : (
            <h4>No GPA.</h4>
          )}
      <br />
      <button onClick={() => {deleteStudent(student.id); alert("Student Deleted!")}}>Delete Student</button>
      <br />
    </div>
  );

};

export default StudentView;